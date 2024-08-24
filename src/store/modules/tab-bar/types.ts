export interface TagProps {
  title: string;
  icon?: string;
  name: string;
  fullPath: string;
  query?: any;
  ignoreCache?: boolean;
}

export interface TabBarState {
  tagList: TagProps[];
  cacheTabList: Set<string>;
}
