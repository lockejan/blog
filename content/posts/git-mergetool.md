---
title: "Neovim As Git Mergetool"
date: 2021-12-19T21:34:10+01:00
draft: false
toc: false
images:
tags: 
  - git
  - neovim
  - cli
---

I like neovim and using git via the cli.
Git has some options to customize specific tasks, for instance solving merge conflicts using [git mergetool][1].
In this blog post I'm going to demonstrate how to setup git and neovim to solve git merge conflicts without the need of an additional GUI tool.

## Setup

To achieve this there are a few prerequisites:

- [neovim][2] and git are installed
- a merge conflict to test the config against

Next Git's config has to be updated in one of the following places:
1. $HOME/.gitconfig
2. $XDG_CONFIG_HOME/git/config
3. Inside the git repository under .git/config (for repo specific configuration)

All of these are parsed and concatenated by git before command execution takes place.
NOTE: Local configuration overrules global configuration options if present.

To update such files different approaches can be considered.

For instance, using the git cli:
`git config mergetool nvim`


This only registers a variable which still needs a command to be executed.

`git config mergetool.nvim.cmd 'nvim -d -c "wincmd l" -c "norm ]c" "$LOCAL" "$MERGED" "$REMOTE"'`


A short notice what is actually being executed here:


- `nvim -d` opens neovim in diffmode.

- `-c "wincmd l"` executes `<C-w>l` to move the focus to the next split to the right.

- `-c "norm ]c"` puts the cursor inside the split to the first change.
It is the equivalent of hitting `]c` in command mode which is indicated by `norm`.
Command mode is also known as normal mode in vim.

- `"$LOCAL" "$MERGED" "$REMOTE"` defines the arrangement of the displayed diffs.


After inserting the new options `git config -l | grep 'merge'` should reveal the following:

```git
merge.tool=nvim
mergetool.nvim.cmd=nvim -d -c "wincmd l" -c "norm ]c" "$LOCAL" "$MERGED" "$REMOTE"
```

Inside the git config file it should look similar to this:

```toml
[merge]
	tool = "nvim"

[mergetool]
	keepBackup = false
	prompt = false

[mergetool "nvim"]
	cmd = "nvim -d -c \"wincmd l\" -c \"norm ]c\" \"$LOCAL\" \"$MERGED\" \"$REMOTE\""
```

## Run

Entering `git mergetool` will then parse all merge conflicted files and populate them iteratively to the mergetool command.

![image alt git-mergetool-cli](/images/git-mergetool-1.png)

## Resolve

![image alt 3way-diff](/images/git-mergetool-2.png "3way-Diff using neovim")

`:diffget local` will use the left diff from the local changes and `:diffget remote` vice versa.

To jump to the next change use `[c`.

After resolving all conflicts for a given file `:wqa` finishes the process and populates the next merge conflicted file into a new diffview.

Furthermore git will also place backup files of the originals inside the git repository, unless git config contains `keepBackup = false`.
Git will also ask before any merge conflicted file is opened in a diff, unless `prompt` is set to `false`.

This is just one approach among many, but it works quite well for me.

Further reading:

1. [git manual][1] for even more configuration options.
2. [neovim source][3] for more cli examples.

[1]: https://git-scm.com/docs/git-mergetool
[2]: https://github.com/neovim/neovim
[3]: https://github.com/neovim/neovim/blob/master/src/nvim/testdir/test_diffmode.vim#L607
