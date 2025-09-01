import type { Schema, Struct } from '@strapi/strapi';

export interface CardsGlobeCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_globe_cards';
  info: {
    description: '';
    displayName: 'Globe_Card';
    icon: 'dashboard';
  };
  attributes: {
    description: Schema.Attribute.String;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    title: Schema.Attribute.String;
  };
}

export interface CardsGraphCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_graph_cards';
  info: {
    description: '';
    displayName: 'Graph_Card';
    icon: 'dashboard';
  };
  attributes: {
    description: Schema.Attribute.String;
    highlighted_text: Schema.Attribute.String;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    title: Schema.Attribute.String;
    top_items: Schema.Attribute.Component<'items.graph-card-top-items', true>;
  };
}

export interface CardsRayCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_ray_cards';
  info: {
    description: '';
    displayName: 'Ray_Card';
    icon: 'dashboard';
  };
  attributes: {
    after_ray_items: Schema.Attribute.Component<'items.ray-items', false>;
    before_ray_items: Schema.Attribute.Component<'items.ray-items', false>;
    description: Schema.Attribute.String;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    title: Schema.Attribute.String;
  };
}

export interface CardsSocialMediaCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_social_media_cards';
  info: {
    description: '';
    displayName: 'Social_Media_Card';
    icon: 'dashboard';
  };
  attributes: {
    Description: Schema.Attribute.String;
    logos: Schema.Attribute.Relation<'oneToMany', 'api::logo.logo'>;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    Title: Schema.Attribute.String;
  };
}

export interface DynamicZoneBlog extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_blogs';
  info: {
    displayName: 'Blog';
    icon: 'pin';
  };
  attributes: {
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    layout: Schema.Attribute.Enumeration<
      ['Featured Posts', 'Blog Posts and Pagination']
    >;
    title: Schema.Attribute.String;
  };
}

export interface DynamicZoneBooking extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_bookings';
  info: {
    displayName: 'Booking';
    icon: 'attachment';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    CTA: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface DynamicZoneBrands extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_brands';
  info: {
    description: '';
    displayName: 'Brands';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String;
    logos: Schema.Attribute.Relation<'oneToMany', 'api::logo.logo'>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneCta extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_ctas';
  info: {
    description: '';
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    CTAs: Schema.Attribute.Component<'shared.button', true>;
    heading: Schema.Attribute.String;
    layout: Schema.Attribute.Enumeration<['Full CTA', 'Minimal CTA']> &
      Schema.Attribute.DefaultTo<'Full CTA'>;
    sub_heading: Schema.Attribute.Text;
  };
}

export interface DynamicZoneFaq extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneFeatureHighlight extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_feature_highlights';
  info: {
    displayName: 'Feature Highlight';
    icon: 'bulletList';
  };
  attributes: {
    bottom_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    right_bottom_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    right_image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface DynamicZoneFeatures extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_features';
  info: {
    description: '';
    displayName: 'Features';
    icon: 'bulletList';
  };
  attributes: {
    globe_card: Schema.Attribute.Component<'cards.globe-card', false>;
    graph_card: Schema.Attribute.Component<'cards.graph-card', false>;
    heading: Schema.Attribute.String;
    ray_card: Schema.Attribute.Component<'cards.ray-card', false>;
    social_media_card: Schema.Attribute.Component<
      'cards.social-media-card',
      false
    >;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneFormNextToSection extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_form_next_to_sections';
  info: {
    description: '';
    displayName: 'Form_Next_To_Section';
    icon: 'book';
  };
  attributes: {
    form: Schema.Attribute.Component<'shared.form', false>;
    heading: Schema.Attribute.String;
    section: Schema.Attribute.Component<'shared.section', false>;
    social_media_icon_links: Schema.Attribute.Component<
      'shared.social-media-icon-links',
      true
    >;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneHero extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'layout';
  };
  attributes: {
    background: Schema.Attribute.Media<'files' | 'images', true>;
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    form_title: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.Text;
  };
}

export interface DynamicZoneHowItWorks extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_how_it_works';
  info: {
    description: '';
    displayName: 'How_It_Works';
    icon: 'question';
  };
  attributes: {
    heading: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'shared.steps', true>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneImagesAndTextSection
  extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_images_and_text_sections';
  info: {
    displayName: 'Images & Text Section';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.Text;
    layout: Schema.Attribute.Enumeration<
      ['Text Right - 3 Images Left', 'Text Left - 2 Images Right']
    > &
      Schema.Attribute.DefaultTo<'Text Right - 3 Images Left'>;
    main_image: Schema.Attribute.Media<'images'>;
    small_left_image: Schema.Attribute.Media<'images'>;
    small_right_image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface DynamicZoneIntroduction extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_introductions';
  info: {
    displayName: 'Introduction';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface DynamicZoneLaunches extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_launches';
  info: {
    description: '';
    displayName: 'Launches';
    icon: 'rocket';
  };
  attributes: {
    heading: Schema.Attribute.String;
    launches: Schema.Attribute.Component<'shared.launches', true>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZonePortfolio extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_portfolios';
  info: {
    displayName: 'Portfolio';
    icon: 'landscape';
  };
  attributes: {
    Slider_Item: Schema.Attribute.Component<'global.portfolio-slider', true>;
  };
}

export interface DynamicZonePricing extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_pricings';
  info: {
    description: '';
    displayName: 'Pricing';
    icon: 'shoppingCart';
  };
  attributes: {
    plans: Schema.Attribute.Relation<'oneToMany', 'api::plan.plan'>;
  };
}

export interface DynamicZoneRelatedArticles extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_related_articles';
  info: {
    description: '';
    displayName: 'related_articles';
    icon: 'bulletList';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneRelatedProducts extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_related_products';
  info: {
    displayName: 'Related_Products';
    icon: 'stack';
  };
  attributes: {
    heading: Schema.Attribute.String;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneReviewItems extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_review_items';
  info: {
    displayName: 'Review Items';
  };
  attributes: {
    company: Schema.Attribute.String;
    name: Schema.Attribute.String;
    review_content: Schema.Attribute.Text;
    social_link: Schema.Attribute.String;
    social_text: Schema.Attribute.String;
    stars: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
  };
}

export interface DynamicZoneReviews extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_reviews';
  info: {
    displayName: 'Reviews';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    review_items: Schema.Attribute.Component<'dynamic-zone.review-items', true>;
    title: Schema.Attribute.String;
  };
}

export interface DynamicZoneTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_testimonials';
  info: {
    description: '';
    displayName: 'Testimonials';
    icon: 'emotionHappy';
  };
  attributes: {
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
  };
}

export interface DynamicZoneTextContent extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_text_contents';
  info: {
    displayName: 'Text Content';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface DynamicZoneTwoColumnIntro extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_two_column_intros';
  info: {
    displayName: 'Two-Column Intro';
    icon: 'dashboard';
  };
  attributes: {
    Content: Schema.Attribute.Blocks;
    Heading: Schema.Attribute.Text;
  };
}

export interface DynamicZoneVideoAndTextSection extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_video_and_text_sections';
  info: {
    displayName: 'Video & Text Section';
    icon: 'play';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface DynamicZoneWhoIWorkWith extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_who_i_work_withs';
  info: {
    displayName: 'Who I Work With';
    icon: 'calendar';
  };
  attributes: {
    icon_box: Schema.Attribute.Component<'items.icon-box', true>;
    title: Schema.Attribute.String;
  };
}

export interface GlobalArticlesBookingMessage extends Struct.ComponentSchema {
  collectionName: 'components_global_articles_booking_messages';
  info: {
    displayName: 'Articles_Booking_Message';
  };
  attributes: {
    booking_message: Schema.Attribute.Text;
    more_articles_button_link: Schema.Attribute.String;
    more_articles_button_text: Schema.Attribute.String;
    more_articles_title: Schema.Attribute.String;
    share_label: Schema.Attribute.String;
  };
}

export interface GlobalCookieConsent extends Struct.ComponentSchema {
  collectionName: 'components_global_cookie_consents';
  info: {
    displayName: 'CookieConsent';
    icon: 'code';
  };
  attributes: {
    accept_button: Schema.Attribute.String;
    decline_button: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    description: '';
    displayName: 'Footer';
    icon: 'apps';
  };
  attributes: {
    accent_primary: Schema.Attribute.Text;
    address: Schema.Attribute.String;
    booking_title: Schema.Attribute.String;
    contact_description: Schema.Attribute.Text;
    contact_title: Schema.Attribute.String;
    copyright: Schema.Attribute.Text;
    designed_developed_by: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    email_label: Schema.Attribute.String;
    form_message: Schema.Attribute.Component<'global.messages', false>;
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>;
    message_label: Schema.Attribute.String;
    message_note: Schema.Attribute.String;
    name_label: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    phone_label: Schema.Attribute.String;
    services: Schema.Attribute.Component<'global.services', true>;
    services_label: Schema.Attribute.String;
    social: Schema.Attribute.Component<'global.social-links', true>;
    submit_label: Schema.Attribute.String;
  };
}

export interface GlobalFormMessages extends Struct.ComponentSchema {
  collectionName: 'components_global_form_messages';
  info: {
    displayName: 'form-messages';
  };
  attributes: {};
}

export interface GlobalMessages extends Struct.ComponentSchema {
  collectionName: 'components_global_messages';
  info: {
    displayName: 'messages';
  };
  attributes: {
    invalid_email: Schema.Attribute.String;
    required_fields: Schema.Attribute.String;
    submit_error: Schema.Attribute.String;
    submit_success: Schema.Attribute.String;
  };
}

export interface GlobalNavbar extends Struct.ComponentSchema {
  collectionName: 'components_global_navbars';
  info: {
    displayName: 'Navbar';
    icon: 'bold';
  };
  attributes: {
    left_navbar_items: Schema.Attribute.Component<'shared.link', true>;
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>;
    right_navbar_items: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface GlobalPortfolioSlider extends Struct.ComponentSchema {
  collectionName: 'components_global_portfolio_sliders';
  info: {
    displayName: 'Portfolio Slider';
    icon: 'landscape';
  };
  attributes: {
    bottom_content: Schema.Attribute.String;
    bottom_content_link: Schema.Attribute.String;
    button: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.String;
    image1: Schema.Attribute.Media<'images'>;
    image10: Schema.Attribute.Media<'files' | 'images'>;
    image2: Schema.Attribute.Media<'files' | 'images'>;
    image3: Schema.Attribute.Media<'images'>;
    image4: Schema.Attribute.Media<'files' | 'images'>;
    image5: Schema.Attribute.Media<'images' | 'files'>;
    image6: Schema.Attribute.Media<'images' | 'files'>;
    image7: Schema.Attribute.Media<'images' | 'files'>;
    image8: Schema.Attribute.Media<'images' | 'files'>;
    image9: Schema.Attribute.Media<'files' | 'images'>;
    title: Schema.Attribute.String;
    video1: Schema.Attribute.Component<'shared.video-popup', false>;
    video2: Schema.Attribute.Component<'shared.video-popup', false>;
  };
}

export interface GlobalServices extends Struct.ComponentSchema {
  collectionName: 'components_global_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    service_name: Schema.Attribute.String;
  };
}

export interface GlobalSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_global_social_links';
  info: {
    displayName: 'social_links';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
  };
}

export interface ItemsGraphCardTopItems extends Struct.ComponentSchema {
  collectionName: 'components_items_graph_card_top_items';
  info: {
    displayName: 'Graph_Card_Top_Items';
    icon: 'bulletList';
  };
  attributes: {
    number: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface ItemsIconBox extends Struct.ComponentSchema {
  collectionName: 'components_items_icon_boxes';
  info: {
    displayName: 'Icon box';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ItemsInput extends Struct.ComponentSchema {
  collectionName: 'components_items_inputs';
  info: {
    description: '';
    displayName: 'Input';
    icon: 'apps';
  };
  attributes: {
    name: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      [
        'text',
        'email',
        'password',
        'submit',
        'textarea',
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'radio',
        'range',
        'reset',
        'search',
        'tel',
        'time',
        'url',
        'week',
      ]
    > &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface ItemsLeftNavbarItems extends Struct.ComponentSchema {
  collectionName: 'components_items_left_navbar_items';
  info: {
    displayName: 'Left_Navbar_Items';
    icon: 'bulletList';
  };
  attributes: {
    name: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface ItemsRayItems extends Struct.ComponentSchema {
  collectionName: 'components_items_ray_items';
  info: {
    description: '';
    displayName: 'Ray_Card_Items';
    icon: 'bulletList';
  };
  attributes: {
    item_1: Schema.Attribute.String;
    item_2: Schema.Attribute.String;
    item_3: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: '';
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['simple', 'outline', 'primary', 'muted']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_forms';
  info: {
    description: '';
    displayName: 'Form';
    icon: 'paperPlane';
  };
  attributes: {
    inputs: Schema.Attribute.Component<'items.input', true>;
  };
}

export interface SharedLaunches extends Struct.ComponentSchema {
  collectionName: 'components_shared_launches';
  info: {
    description: '';
    displayName: 'Launches';
    icon: 'rocket';
  };
  attributes: {
    description: Schema.Attribute.String;
    mission_number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedPerks extends Struct.ComponentSchema {
  collectionName: 'components_shared_perks';
  info: {
    description: '';
    displayName: 'Perks';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_sections';
  info: {
    displayName: 'Section';
    icon: 'cursor';
  };
  attributes: {
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
    users: Schema.Attribute.Component<'shared.user', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSocialMediaIconLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_media_icon_links';
  info: {
    description: '';
    displayName: 'Social_Media_Icon_Links';
    icon: 'expand';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SharedSteps extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    description: '';
    displayName: 'Steps';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedUser extends Struct.ComponentSchema {
  collectionName: 'components_shared_users';
  info: {
    description: '';
    displayName: 'User';
    icon: 'user';
  };
  attributes: {
    firstname: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    job: Schema.Attribute.String;
    lastname: Schema.Attribute.String;
  };
}

export interface SharedVideoPopup extends Struct.ComponentSchema {
  collectionName: 'components_shared_video_popups';
  info: {
    displayName: 'Video Popup';
    icon: 'play';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    video: Schema.Attribute.Media<'files' | 'videos'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.globe-card': CardsGlobeCard;
      'cards.graph-card': CardsGraphCard;
      'cards.ray-card': CardsRayCard;
      'cards.social-media-card': CardsSocialMediaCard;
      'dynamic-zone.blog': DynamicZoneBlog;
      'dynamic-zone.booking': DynamicZoneBooking;
      'dynamic-zone.brands': DynamicZoneBrands;
      'dynamic-zone.cta': DynamicZoneCta;
      'dynamic-zone.faq': DynamicZoneFaq;
      'dynamic-zone.feature-highlight': DynamicZoneFeatureHighlight;
      'dynamic-zone.features': DynamicZoneFeatures;
      'dynamic-zone.form-next-to-section': DynamicZoneFormNextToSection;
      'dynamic-zone.hero': DynamicZoneHero;
      'dynamic-zone.how-it-works': DynamicZoneHowItWorks;
      'dynamic-zone.images-and-text-section': DynamicZoneImagesAndTextSection;
      'dynamic-zone.introduction': DynamicZoneIntroduction;
      'dynamic-zone.launches': DynamicZoneLaunches;
      'dynamic-zone.portfolio': DynamicZonePortfolio;
      'dynamic-zone.pricing': DynamicZonePricing;
      'dynamic-zone.related-articles': DynamicZoneRelatedArticles;
      'dynamic-zone.related-products': DynamicZoneRelatedProducts;
      'dynamic-zone.review-items': DynamicZoneReviewItems;
      'dynamic-zone.reviews': DynamicZoneReviews;
      'dynamic-zone.testimonials': DynamicZoneTestimonials;
      'dynamic-zone.text-content': DynamicZoneTextContent;
      'dynamic-zone.two-column-intro': DynamicZoneTwoColumnIntro;
      'dynamic-zone.video-and-text-section': DynamicZoneVideoAndTextSection;
      'dynamic-zone.who-i-work-with': DynamicZoneWhoIWorkWith;
      'global.articles-booking-message': GlobalArticlesBookingMessage;
      'global.cookie-consent': GlobalCookieConsent;
      'global.footer': GlobalFooter;
      'global.form-messages': GlobalFormMessages;
      'global.messages': GlobalMessages;
      'global.navbar': GlobalNavbar;
      'global.portfolio-slider': GlobalPortfolioSlider;
      'global.services': GlobalServices;
      'global.social-links': GlobalSocialLinks;
      'items.graph-card-top-items': ItemsGraphCardTopItems;
      'items.icon-box': ItemsIconBox;
      'items.input': ItemsInput;
      'items.left-navbar-items': ItemsLeftNavbarItems;
      'items.ray-items': ItemsRayItems;
      'shared.button': SharedButton;
      'shared.form': SharedForm;
      'shared.launches': SharedLaunches;
      'shared.link': SharedLink;
      'shared.perks': SharedPerks;
      'shared.section': SharedSection;
      'shared.seo': SharedSeo;
      'shared.social-media-icon-links': SharedSocialMediaIconLinks;
      'shared.steps': SharedSteps;
      'shared.user': SharedUser;
      'shared.video-popup': SharedVideoPopup;
    }
  }
}
