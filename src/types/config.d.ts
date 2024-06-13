declare module 'react-native-config' {
  export const SUPERBASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
