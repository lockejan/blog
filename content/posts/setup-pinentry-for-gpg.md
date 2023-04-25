---
title: "Setup Pinentry for GPG with Nix"
date: 2023-04-25T21:09:42+02:00
draft: true
toc: false
images:
tags: 
  - gpg
  - nix
  - cli
  - MacOS
---

# What?

Setting up pinentry is needed to get a password prompt to leverage the capabilities of your GPG key.

The GnuPG project describes pinentry as follows:
> pinentry is a small collection of dialog programs that allow GnuPG to read passphrases and PIN numbers in a secure manner. There are versions for the common GTK and Qt toolkits as well as for the text terminal (Curses). [Source](https://www.gnupg.org/related_software/pinentry/index.html)


# Why?

I store my gpg key on a hardware token([Yubikey](https://support.yubico.com/hc/en-us/articles/360013790259-Using-Your-YubiKey-with-OpenPGP)) and use it for several things. 
Mostly for [signing git commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits), but also for shared password stores with [gopass](https://www.gopass.pw/).

When it comes to configuration, I want to make sure as much as possible, that my configuration is consistent and reproducible across devices. Even though documentation as code serves me well so far, a little more context and motivation makes sometimes sense in my opinion. 
Hence the reason for this post.
Take a look at my [dotfiles](https://github.com/lockejan/nix-dotfiles), if you like to know more about it.

# How?

There are several options for MacOS to install and setup GPG.
I'm using [nix-Darwin](https://github.com/LnL7/nix-darwin) and [home-manager](https://github.com/nix-community/home-manager) to provision everything, but of course there are alternatives available, e.g. Homebrew.

During installation or after the first invocation of GPG the `~/.gnupg` directory will be created.
A quick inspection of the aforementioned yields
```bash
lt -L1 ~/.gnupg/

/Users/lockejan/.gnupg
├── gpg-agent.conf -> /nix/store/yaz4gnxl88v7r4hs8qmdkqxcnximspcs-home-manager-files/.gnupg/gpg-agent.conf
├── gpg.conf -> /nix/store/yaz4gnxl88v7r4hs8qmdkqxcnximspcs-home-manager-files/.gnupg/gpg.conf
├── private-keys-v1.d
├── pubring.kbx
├── pubring.kbx~
├── random_seed
├── S.gpg-agent
├── S.gpg-agent.browser
├── S.gpg-agent.extra
├── S.gpg-agent.ssh
├── S.scdaemon
├── scdaemon.conf -> /nix/store/yaz4gnxl88v7r4hs8qmdkqxcnximspcs-home-manager-files/.gnupg/scdaemon.conf
├── sshcontrol -> /nix/store/yaz4gnxl88v7r4hs8qmdkqxcnximspcs-home-manager-files/.gnupg/sshcontrol
└── trustdb.gpg
```

The pinentry-program declaration resides within `gpg-agent.conf` and contains here:

```bash
pinentry-program /nix/store/zw5yk88src994ac2q1jg2yr2x7zdsmkv-pinentry-mac-1.1.1.1/Applications/pinentry-mac.app/Contents/MacOS/pinentry-mac
enable-ssh-support
default-cache-ttl 600
max-cache-ttl 7200
```

The nix source file for this looks as following:

```nix
home.file.".gnupg/gpg-agent.conf".text = ''
  pinentry-program ${pkgs.pinentry_mac}/Applications/pinentry-mac.app/Contents/MacOS/pinentry-mac
  enable-ssh-support
  default-cache-ttl 600
  max-cache-ttl 7200
'';
};

```

`${pkgs.pinentry_mac}` within this multi-line string gets expanded to the package path within the nix store.
GPG is quite picky about the reference, which makes it necessary to give the full path to the executable.
What makes nix so nice here IMO is that configuration and installation of packages are declaratively composed together.
There is no need to explicitly install the package before, as it would be the case with Homebrew, because nix will install it during the build step of the system derivation.

Without nix the agent has to be reloaded via 
```bash
gpg-connect-agent /bye
```

With nix just build another generation via `darwin-rebuild switch` or `home-manager switch`.

To finally test the setup 
```bash
echo "test" | gpg --clearsign
```

should open a prompt and print out a PGP signature in the terminal buffer on success afterwards.


Nixpkgs contains [other variants of pinentry](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=pinentry), but I like the convenience of Apples keychain integration, which is only available via [pinentry-mac](https://github.com/GPGTools/pinentry/blob/master/macosx/KeychainSupport.m), as far as I know.
Once entered and confirmed the gpg-key password doesn't need to be entered again, because it is stored in the keychain and will be provided from it.


## pinentry-ncurses

A simple alternative to pinentry-mac is just pinentry or pinentry-ncurses.
Setting up an ncurses-based pinentry with the above expression is a bit more concise:
```nix
pinentry-program ${pkgs.pinentry}/bin/pinentry

```

But additionally 
```bash
export GPG_TTY=$(tty)
```
needs to be added permanently to the shell environment.

More on that can be found in the [GnuPG manuals](https://www.gnupg.org/documentation/manuals/gnupg/Agent-Examples.html#Agent-Examples).

