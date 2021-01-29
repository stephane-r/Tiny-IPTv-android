export interface LoginFormData {
  username: string;
  password: string;
  server: string;
}

export interface AppState {
  categories: string[];
  categoriesFiltered: string[];
  data: {
    [key: string]: ChannelGroup[];
  };
}

export interface ChannelGroup {
  title: string;
  items: Channel[];
}

export interface Channel {
  name: string;
  tvg: {
    id: string;
    name: string;
    language: string;
    country: string;
    logo: string;
    url: string;
  };
  group: {
    title: string;
  };
  http: {
    referrer: string;
    'user-agent': string;
  };
  url: string;
  raw: string;
}

export interface FavorisState {
  ids: string[];
  data: Channel[];
}

export interface Snackbar {
  visible: boolean;
  message: string;
  action: {
    label: string;
    onPress: () => void;
  };
}
