{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs-slim_latest
    pkgs.openssl
    pkgs.python312
    pkgs.curl
    pkgs.pnpm
  ];

  env = {};
  idx = {
    extensions = [
      "biomejs.biome"
    ];

    previews = {
      enable = true;
    };
  };
}
