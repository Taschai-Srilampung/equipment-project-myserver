import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    responsible: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::responsible.responsible'
    >;
    role_in_web: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::role-in-web.role-in-web'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuildingBuilding extends Schema.CollectionType {
  collectionName: 'buildings';
  info: {
    singularName: 'building';
    pluralName: 'buildings';
    displayName: 'building';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    buildingName: Attribute.String;
    inventories: Attribute.Relation<
      'api::building.building',
      'oneToMany',
      'api::inventory.inventory'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::building.building',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::building.building',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CategoryName: Attribute.String;
    inventories: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::inventory.inventory'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCompanyInventoryCompanyInventory
  extends Schema.CollectionType {
  collectionName: 'company_inventories';
  info: {
    singularName: 'company-inventory';
    pluralName: 'company-inventories';
    displayName: 'CompanyInventory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Cname: Attribute.String;
    contactName: Attribute.String;
    Cemail: Attribute.Email;
    Caddress: Attribute.Text;
    inventories: Attribute.Relation<
      'api::company-inventory.company-inventory',
      'oneToMany',
      'api::inventory.inventory'
    >;
    Cphone: Attribute.String;
    role: Attribute.String;
    taxId: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::company-inventory.company-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::company-inventory.company-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHowToGetHowToGet extends Schema.CollectionType {
  collectionName: 'how_to_gets';
  info: {
    singularName: 'how-to-get';
    pluralName: 'how-to-gets';
    displayName: 'howToGet';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    howToGetName: Attribute.String;
    inventories: Attribute.Relation<
      'api::how-to-get.how-to-get',
      'oneToMany',
      'api::inventory.inventory'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::how-to-get.how-to-get',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::how-to-get.how-to-get',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInventoryInventory extends Schema.CollectionType {
  collectionName: 'inventories';
  info: {
    singularName: 'inventory';
    pluralName: 'inventories';
    displayName: 'Inventory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    id_inv: Attribute.String;
    img_inv: Attribute.Media;
    DateOrder: Attribute.Date;
    DateRecive: Attribute.Date;
    serialNumber: Attribute.String;
    company_inventory: Attribute.Relation<
      'api::inventory.inventory',
      'manyToOne',
      'api::company-inventory.company-inventory'
    >;
    responsibles: Attribute.Relation<
      'api::inventory.inventory',
      'manyToMany',
      'api::responsible.responsible'
    >;
    category: Attribute.Relation<
      'api::inventory.inventory',
      'manyToOne',
      'api::category.category'
    >;
    building: Attribute.Relation<
      'api::inventory.inventory',
      'manyToOne',
      'api::building.building'
    >;
    how_to_get: Attribute.Relation<
      'api::inventory.inventory',
      'manyToOne',
      'api::how-to-get.how-to-get'
    >;
    year_money_get: Attribute.Relation<
      'api::inventory.inventory',
      'manyToOne',
      'api::year-money-get.year-money-get'
    >;
    brand: Attribute.String;
    model: Attribute.String;
    age_use: Attribute.Integer;
    information: Attribute.Text;
    source_money: Attribute.Relation<
      'api::inventory.inventory',
      'manyToOne',
      'api::source-money.source-money'
    >;
    floor: Attribute.String;
    room: Attribute.String;
    status_inventory: Attribute.Relation<
      'api::inventory.inventory',
      'oneToOne',
      'api::status-inventory.status-inventory'
    >;
    prize: Attribute.Decimal;
    allowedRepair: Attribute.Boolean;
    status_repair: Attribute.Relation<
      'api::inventory.inventory',
      'oneToOne',
      'api::status-repair.status-repair'
    >;
    repair_reports: Attribute.Relation<
      'api::inventory.inventory',
      'oneToMany',
      'api::repair-report.repair-report'
    >;
    maintenance_reports: Attribute.Relation<
      'api::inventory.inventory',
      'oneToMany',
      'api::maintenance-report.maintenance-report'
    >;
    request_change_locations: Attribute.Relation<
      'api::inventory.inventory',
      'manyToMany',
      'api::request-change-location.request-change-location'
    >;
    notDisposal: Attribute.Boolean;
    sub_inventories: Attribute.Relation<
      'api::inventory.inventory',
      'oneToMany',
      'api::sub-inventory.sub-inventory'
    >;
    isDisposal: Attribute.Boolean;
    request_sent_backs: Attribute.Relation<
      'api::inventory.inventory',
      'oneToMany',
      'api::request-sent-back.request-sent-back'
    >;
    request_disposal: Attribute.Relation<
      'api::inventory.inventory',
      'manyToOne',
      'api::request-disposal.request-disposal'
    >;
    isReporting: Attribute.Boolean;
    asset_code: Attribute.String;
    unit: Attribute.Relation<
      'api::inventory.inventory',
      'oneToOne',
      'api::unit.unit'
    >;
    quantity: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::inventory.inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::inventory.inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMaintenanceReportMaintenanceReport
  extends Schema.CollectionType {
  collectionName: 'maintenance_reports';
  info: {
    singularName: 'maintenance-report';
    pluralName: 'maintenance-reports';
    displayName: 'MaintenanceReport';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    inventory: Attribute.Relation<
      'api::maintenance-report.maintenance-report',
      'manyToOne',
      'api::inventory.inventory'
    >;
    company_inventory: Attribute.Relation<
      'api::maintenance-report.maintenance-report',
      'oneToOne',
      'api::company-inventory.company-inventory'
    >;
    DateToDo: Attribute.Date;
    newDueDate: Attribute.Date;
    countNextToDueDate: Attribute.Integer;
    FileMaintenanceByAdmin: Attribute.Media;
    DueDate: Attribute.Date;
    sub_inventory: Attribute.Relation<
      'api::maintenance-report.maintenance-report',
      'manyToOne',
      'api::sub-inventory.sub-inventory'
    >;
    isDone: Attribute.Boolean;
    isSubInventory: Attribute.Boolean;
    prize: Attribute.Decimal;
    DetailMaintenance: Attribute.Text;
    NameMaintenance: Attribute.String;
    reportedBy: Attribute.Relation<
      'api::maintenance-report.maintenance-report',
      'manyToOne',
      'api::responsible.responsible'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::maintenance-report.maintenance-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::maintenance-report.maintenance-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRepairReportRepairReport extends Schema.CollectionType {
  collectionName: 'repair_reports';
  info: {
    singularName: 'repair-report';
    pluralName: 'repair-reports';
    displayName: 'RepairReport';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    inventory: Attribute.Relation<
      'api::repair-report.repair-report',
      'manyToOne',
      'api::inventory.inventory'
    >;
    RepairReasonByResponsible: Attribute.Text;
    ReportFileByResponsible: Attribute.Media;
    status_repair: Attribute.Relation<
      'api::repair-report.repair-report',
      'oneToOne',
      'api::status-repair.status-repair'
    >;
    company_inventory: Attribute.Relation<
      'api::repair-report.repair-report',
      'oneToOne',
      'api::company-inventory.company-inventory'
    >;
    NameRepair: Attribute.String;
    DetailRepairByAdmin: Attribute.Text;
    RepairPrice: Attribute.Decimal;
    FileRepairByAdmin: Attribute.Media;
    table_repair_and_maintenance: Attribute.Relation<
      'api::repair-report.repair-report',
      'manyToOne',
      'api::table-repair-and-maintenance.table-repair-and-maintenance'
    >;
    sub_inventory: Attribute.Relation<
      'api::repair-report.repair-report',
      'manyToOne',
      'api::sub-inventory.sub-inventory'
    >;
    isDone: Attribute.Boolean;
    isSubInventory: Attribute.Boolean;
    dateDoingRepair: Attribute.Date;
    dateFinishRepair: Attribute.Date;
    FileRepairDone: Attribute.Media;
    NumberRepairFaculty: Attribute.String;
    ResultConsider: Attribute.String;
    DetailConsider: Attribute.Text;
    ListDetailRepair: Attribute.Text;
    FileConsider: Attribute.Media;
    isCanRepair: Attribute.Boolean;
    reportedBy: Attribute.Relation<
      'api::repair-report.repair-report',
      'manyToOne',
      'api::responsible.responsible'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::repair-report.repair-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::repair-report.repair-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRequestChangeLocationRequestChangeLocation
  extends Schema.CollectionType {
  collectionName: 'request_change_locations';
  info: {
    singularName: 'request-change-location';
    pluralName: 'request-change-locations';
    displayName: 'RequestChangeLocation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    NewLocationRoom: Attribute.String;
    NewLocationFloor: Attribute.String;
    building: Attribute.Relation<
      'api::request-change-location.request-change-location',
      'oneToOne',
      'api::building.building'
    >;
    inventories: Attribute.Relation<
      'api::request-change-location.request-change-location',
      'manyToMany',
      'api::inventory.inventory'
    >;
    isDone: Attribute.Boolean;
    reportedBy: Attribute.Relation<
      'api::request-change-location.request-change-location',
      'manyToOne',
      'api::responsible.responsible'
    >;
    OldLocationRoom: Attribute.String;
    OldLocationFloor: Attribute.String;
    Oldbuilding: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::request-change-location.request-change-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::request-change-location.request-change-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRequestDisposalRequestDisposal
  extends Schema.CollectionType {
  collectionName: 'request_disposals';
  info: {
    singularName: 'request-disposal';
    pluralName: 'request-disposals';
    displayName: 'RequestDisposal';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ReasonDisposal: Attribute.Text;
    FileReasonDisposal: Attribute.Media;
    inventories: Attribute.Relation<
      'api::request-disposal.request-disposal',
      'oneToMany',
      'api::inventory.inventory'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::request-disposal.request-disposal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::request-disposal.request-disposal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRequestSentBackRequestSentBack
  extends Schema.CollectionType {
  collectionName: 'request_sent_backs';
  info: {
    singularName: 'request-sent-back';
    pluralName: 'request-sent-backs';
    displayName: 'RequestSentBack';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ReasonSentBack: Attribute.Text;
    FileReasonSentBack: Attribute.Media;
    inventory: Attribute.Relation<
      'api::request-sent-back.request-sent-back',
      'manyToOne',
      'api::inventory.inventory'
    >;
    isDone: Attribute.Boolean;
    Allowed: Attribute.Boolean;
    reportedBy: Attribute.Relation<
      'api::request-sent-back.request-sent-back',
      'manyToOne',
      'api::responsible.responsible'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::request-sent-back.request-sent-back',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::request-sent-back.request-sent-back',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResponsibleResponsible extends Schema.CollectionType {
  collectionName: 'responsibles';
  info: {
    singularName: 'responsible';
    pluralName: 'responsibles';
    displayName: 'Responsible';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    responsibleName: Attribute.String;
    responsibleEmail: Attribute.Email;
    responsiblePhone: Attribute.String;
    request_change_locations: Attribute.Relation<
      'api::responsible.responsible',
      'oneToMany',
      'api::request-change-location.request-change-location'
    >;
    request_sent_backs: Attribute.Relation<
      'api::responsible.responsible',
      'oneToMany',
      'api::request-sent-back.request-sent-back'
    >;
    repair_reports: Attribute.Relation<
      'api::responsible.responsible',
      'oneToMany',
      'api::repair-report.repair-report'
    >;
    maintenance_reports: Attribute.Relation<
      'api::responsible.responsible',
      'oneToMany',
      'api::maintenance-report.maintenance-report'
    >;
    inventories: Attribute.Relation<
      'api::responsible.responsible',
      'manyToMany',
      'api::inventory.inventory'
    >;
    employee_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::responsible.responsible',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::responsible.responsible',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRoleInWebRoleInWeb extends Schema.CollectionType {
  collectionName: 'role_in_webs';
  info: {
    singularName: 'role-in-web';
    pluralName: 'role-in-webs';
    displayName: 'RoleInWeb';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    RoleName: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::role-in-web.role-in-web',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::role-in-web.role-in-web',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSourceMoneySourceMoney extends Schema.CollectionType {
  collectionName: 'source_monies';
  info: {
    singularName: 'source-money';
    pluralName: 'source-monies';
    displayName: 'sourceMoney';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sourceMoneyName: Attribute.String;
    inventories: Attribute.Relation<
      'api::source-money.source-money',
      'oneToMany',
      'api::inventory.inventory'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::source-money.source-money',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::source-money.source-money',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStatusInventoryStatusInventory
  extends Schema.CollectionType {
  collectionName: 'status_inventories';
  info: {
    singularName: 'status-inventory';
    pluralName: 'status-inventories';
    displayName: 'StatusInventory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    StatusInventoryName: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::status-inventory.status-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::status-inventory.status-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStatusRepairStatusRepair extends Schema.CollectionType {
  collectionName: 'status_repairs';
  info: {
    singularName: 'status-repair';
    pluralName: 'status-repairs';
    displayName: 'StatusRepair';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameStatusRepair: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::status-repair.status-repair',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::status-repair.status-repair',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubInventorySubInventory extends Schema.CollectionType {
  collectionName: 'sub_inventories';
  info: {
    singularName: 'sub-inventory';
    pluralName: 'sub-inventories';
    displayName: 'SubInventory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    id_inv: Attribute.String;
    serialNumber: Attribute.String;
    brand: Attribute.String;
    model: Attribute.String;
    status_inventory: Attribute.Relation<
      'api::sub-inventory.sub-inventory',
      'oneToOne',
      'api::status-inventory.status-inventory'
    >;
    repair_reports: Attribute.Relation<
      'api::sub-inventory.sub-inventory',
      'oneToMany',
      'api::repair-report.repair-report'
    >;
    maintenance_reports: Attribute.Relation<
      'api::sub-inventory.sub-inventory',
      'oneToMany',
      'api::maintenance-report.maintenance-report'
    >;
    inventory: Attribute.Relation<
      'api::sub-inventory.sub-inventory',
      'manyToOne',
      'api::inventory.inventory'
    >;
    isSubInventory: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sub-inventory.sub-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sub-inventory.sub-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTableRepairAndMaintenanceTableRepairAndMaintenance
  extends Schema.CollectionType {
  collectionName: 'table_repair_and_maintenances';
  info: {
    singularName: 'table-repair-and-maintenance';
    pluralName: 'table-repair-and-maintenances';
    displayName: 'TableRepairAndMaintenance';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    repair_reports: Attribute.Relation<
      'api::table-repair-and-maintenance.table-repair-and-maintenance',
      'oneToMany',
      'api::repair-report.repair-report'
    >;
    TypeOfReport: Attribute.Enumeration<['Repair', 'Maintenance']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::table-repair-and-maintenance.table-repair-and-maintenance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::table-repair-and-maintenance.table-repair-and-maintenance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUnitUnit extends Schema.CollectionType {
  collectionName: 'units';
  info: {
    singularName: 'unit';
    pluralName: 'units';
    displayName: 'Unit';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name_unit: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::unit.unit', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::unit.unit', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiYearMoneyGetYearMoneyGet extends Schema.CollectionType {
  collectionName: 'year_money_gets';
  info: {
    singularName: 'year-money-get';
    pluralName: 'year-money-gets';
    displayName: 'yearMoneyGet';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    yearMoneyGetName: Attribute.String;
    inventories: Attribute.Relation<
      'api::year-money-get.year-money-get',
      'oneToMany',
      'api::inventory.inventory'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::year-money-get.year-money-get',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::year-money-get.year-money-get',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::building.building': ApiBuildingBuilding;
      'api::category.category': ApiCategoryCategory;
      'api::company-inventory.company-inventory': ApiCompanyInventoryCompanyInventory;
      'api::how-to-get.how-to-get': ApiHowToGetHowToGet;
      'api::inventory.inventory': ApiInventoryInventory;
      'api::maintenance-report.maintenance-report': ApiMaintenanceReportMaintenanceReport;
      'api::repair-report.repair-report': ApiRepairReportRepairReport;
      'api::request-change-location.request-change-location': ApiRequestChangeLocationRequestChangeLocation;
      'api::request-disposal.request-disposal': ApiRequestDisposalRequestDisposal;
      'api::request-sent-back.request-sent-back': ApiRequestSentBackRequestSentBack;
      'api::responsible.responsible': ApiResponsibleResponsible;
      'api::role-in-web.role-in-web': ApiRoleInWebRoleInWeb;
      'api::source-money.source-money': ApiSourceMoneySourceMoney;
      'api::status-inventory.status-inventory': ApiStatusInventoryStatusInventory;
      'api::status-repair.status-repair': ApiStatusRepairStatusRepair;
      'api::sub-inventory.sub-inventory': ApiSubInventorySubInventory;
      'api::table-repair-and-maintenance.table-repair-and-maintenance': ApiTableRepairAndMaintenanceTableRepairAndMaintenance;
      'api::unit.unit': ApiUnitUnit;
      'api::year-money-get.year-money-get': ApiYearMoneyGetYearMoneyGet;
    }
  }
}
