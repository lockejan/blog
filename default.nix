with import <nixpkgs> {};
mkShell {
  nativeBuildInputs = with pkgs; [
    bashInteractive
    hugo
  ];
}
