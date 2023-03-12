export interface HostVolume {
  name: string;
  path: string;
}

function generateHostVolume(hostVolume: HostVolume) {
  return `
  host_volume "${hostVolume.name}" {
    path = "${hostVolume.path}"
  }
  `;
}

export function generateConfig(hostVolumes: HostVolume[]) {
  return `
bind_addr = "0.0.0.0"

client {
  ${hostVolumes.map((hv) => generateHostVolume(hv)).join("\n")}
}

plugin "docker" {
  config {
    volumes {
      enabled = true
    }
  }
}
  `;
}
