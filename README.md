# `nomad-tool`

> A tool for quickly spinning up Nomad for development environments.

## Install

```bash
npm i -g nomad-tool
```

## Requirements

- Nomad
- Docker

## Usage

### Start dev environment

> Before starting the dev server, make sure you are in the correct working directory,
> usually you want to be in the root directory of your code repo.
>
> `nomad-tool` will create a hidden file called `.nomad.hcl` containing the Nomad config.

```bash
nomad-tool dev
```

The tool will do a few things before starting the dev server:

- Generates a Nomad config, which configures the following:
  - Enable Docker volumes
  - Create a host volume mapped to each directory within `./data` in the current working directory

#### Host Volumes

`nomad-tool` will automatically create host volumes for each directory within the `./data` directory, for example:

```
my-repo/
└── data/
    ├── my-app/
    └── my-database/
```

The following host volumes will be created:

- `my-app` mounted to `./data/my-app`
- `my-database` mounted to `./data/my-database`

## Config

To see what the underlying configuration Nomad is using, see `.nomad.hcl`

```bash
cat .nomad.hcl
```
