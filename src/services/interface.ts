export interface IHeader {
  logo_image: Image;
  search_image: Image;
  language_image: Image;
  category_menu: CategoryMenu[];
  site_icon: string;
  site_title: string;
  tagline: string;
}

export interface Sizes {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
  "1536x1536": string;
  "1536x1536-width": number;
  "1536x1536-height": number;
  "2048x2048": string;
  "2048x2048-width": number;
  "2048x2048-height": number;
}

export interface Image {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface CategoryMenu {
  category_name: string;
  category: ICategory;
}

export interface IFooter {
  site_rights: string;
  footer_links: FooterLink[];
  footer_social_media: FooterSocialMedum[];
}

export interface FooterLink {
  name: string;
  url: string;
  open_in_new_tab: string;
}

export interface FooterSocialMedum {
  icon_image: Image;
  url: string;
  open_in_new_tab: "Yes" | "No";
}

export interface IFollow {
  title_follow_next_question: string;
  social_media_list: SocialMediaList[];
  img?: string;
}

export interface SocialMediaList {
  icon_image: Image;
  social_name: string;
  url: string;
  open_in_new_tab: "Yes" | "No";
}

export interface IHome {
  firstBlock: FirstBlock;
  secondBlock: SecondBlock;
  thirdBlock: ThirdBlock;
  fourthBlock: FourthBlock;
}

export interface FirstBlock {
  title: string;
  latestNews: IPost[];
}

export interface PostContentLangs {
  en: boolean;
  zh: boolean;
}

export interface PostTitleLangs {
  en: boolean;
  zh: boolean;
}

export interface I18nConfig {
  name: Name;
}

export interface Name {
  ts: Ts;
}

export interface Ts {
  en: string;
  zh: string;
}

export interface SecondBlock {
  title: string;
  subtitle: string;
  background_image: BackgroundImage;
  category_title: string;
  right_image: Image;
  secondBlockPosts: IPost[];
  background_image_opacity: string;
}

export interface BackgroundImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Sizes {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
  "1536x1536": string;
  "1536x1536-width": number;
  "1536x1536-height": number;
  "2048x2048": string;
  "2048x2048-width": number;
  "2048x2048-height": number;
}

export interface IPost {
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  filter: string;
  post_content_ml: string;
  post_content_langs: PostContentLangs;
  post_title_ml: string;
  post_title_langs: PostTitleLangs;
  thumbnail: string;
  categories: ICategory[];
  youtube_url: string;
  interview_audio: string;
  views: number;
  reporter?: string;
  interviewer?: string;
  author_name?: string;
  background_video_file: {
    url: string;
  };
  open_in_new_tab: string;
  background_opacity: string;
  resource: string;
  select_type_video_or_audio: string;
  display_this_category?: ICategory;
}

export interface ThirdBlock {
  title: string;
  thirdBlockPosts: IPost[];
}

export interface FourthBlock {
  title: string;
  fourth_block_button_name: string;
  fourth_block_background_image: Image;
  fourthBlockPosts: IPost[];
  fourth_block_button_name_for_video?: string;
  fourth_block_button_name_for_audio?: string;
}

export interface PostContentLangs {
  en: boolean;
  zh: boolean;
}

export interface ICategory {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  i18n_config: I18nConfig;
  cat_ID: number;
  category_count: number;
  category_description: string;
  cat_name: string;
  category_nicename: string;
  category_parent: number;
  all_posts: IPost[];
  subcategories?: ICategory[];
  thumbnail: string;
}

export interface Page {
  title: string;
  featured_image: string;
  featured_image_alt: string;
  content: string;
  form: FormField[];
  form_id?: string;
}

interface FormField {
  type: string;
  basetype: string;
  raw_name: string;
  name: string;
  options: string[];
  raw_values: string[];
  values: string[];
  pipes: Record<string, any>;
  labels: string[];
  attr: string;
  content: string;
}

export interface SearchPage {
  featured_image: Image;
  placeholder_for_search_input: string;
}
