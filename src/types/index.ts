// Core Database Models (based on Prisma schema)
export enum FileType {
  raw = 'raw',
  jpeg = 'jpeg',
  tiff = 'tiff',
  xmp = 'xmp',
  video = 'video',
  other = 'other'
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash?: string;
  timezone: string;
  defaultView: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface Directory {
  id: string;
  name: string;
  parentId?: string;
  fullPath: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface File {
  id: string;
  name: string;
  directoryId?: string;
  s3Bucket: string;
  s3Key: string;
  s3VersionId?: string;
  originalFilename?: string;
  fileSize: bigint;
  mimeType?: string;
  fileExtension?: string;
  md5Hash?: string;
  sha256Hash?: string;
  captureDate?: Date;
  cameraMake?: string;
  cameraModel?: string;
  lensModel?: string;
  focalLength?: number;
  aperture?: number;
  shutterSpeed?: string;
  iso?: number;
  width?: number;
  height?: number;
  isVisible: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userId?: string;
}

export interface FileVersion {
  id: string;
  parentFileId: string;
  versionFileId: string;
  versionNumber: number;
  versionName?: string;
  fileType: FileType;
  relationshipType: string;
  processingSoftware?: string;
  processingVersion?: string;
  processingSettings?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  coverFileId?: string;
  isSmart: boolean;
  smartCriteria?: any;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionFile {
  id: string;
  collectionId: string;
  fileId: string;
  sortOrder: number;
  createdAt: Date;
}

export interface MetadataKey {
  id: string;
  keyName: string;
  dataType: string;
  description?: string;
  isSystem: boolean;
  createdAt: Date;
}

export interface FileMetadata {
  id: string;
  fileId: string;
  metadataKeyId: string;
  stringValue?: string;
  numberValue?: number;
  booleanValue?: boolean;
  dateValue?: Date;
  jsonValue?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessPermission {
  id: string;
  userId: string;
  resourceType: string;
  resourceId: string;
  permissionLevel: string;
  grantedBy?: string;
  grantedAt: Date;
  expiresAt?: Date;
}

export interface SystemSetting {
  id: string;
  settingKey: string;
  settingValue?: any;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  oldValues?: any;
  newValues?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// Extended types with relations
export interface FileWithRelations extends File {
  directory?: Directory | null;
  user?: User | null;
  versions?: FileVersion[];
  parentVersions?: FileVersion[];
  metadata?: FileMetadataWithKey[];
}

export interface FileMetadataWithKey extends FileMetadata {
  metadataKey: {
    keyName: string;
    dataType: string;
  };
}

export interface DirectoryWithFiles extends Directory {
  files?: File[];
  children?: Directory[];
  parent?: Directory | null;
}

export interface CollectionWithFiles extends Collection {
  files?: CollectionFileWithFile[];
}

export interface CollectionFileWithFile extends CollectionFile {
  file: FileWithRelations;
}

// API Request/Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface FileUploadRequest {
  directoryId?: string;
  metadata?: Record<string, any>;
  isNewVersion?: boolean;
  parentFileId?: string;
}

export interface FileUploadResponse extends ApiResponse<FileWithRelations> {}

export interface FileVersionRequest {
  versionName?: string;
  processingSettings?: Record<string, any>;
  relationshipType?: string;
}

// Authentication Types
export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends ApiResponse<{
  token: string;
  user: Omit<User, 'passwordHash'>;
}> {}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  timezone?: string;
}

// File Processing Types
export interface FileMetadataExtracted {
  width?: number;
  height?: number;
  colorSpace?: string;
  captureDate?: Date;
  camera?: CameraInfo;
  gps?: GpsInfo;
  exif?: any;
}

export interface CameraInfo {
  make?: string;
  model?: string;
  lensModel?: string;
  focalLength?: number;
  aperture?: number;
  shutterSpeed?: string;
  iso?: number;
}

export interface GpsInfo {
  latitude?: number;
  longitude?: number;
  altitude?: number;
}

export interface XmpData {
  title?: string;
  description?: string;
  keywords?: string[];
  rating?: number;
  colorLabel?: string;
  processingSettings?: Record<string, any>;
  creator?: string;
  creatorTool?: string;
  rights?: string;
  xmpVersion?: string;
  countryCode?: string;
  location?: string;
}

// S3 Types
export interface S3UploadResult {
  bucket: string;
  key: string;
  location: string;
  etag: string;
  versionId?: string;
}

export interface PresignedUrlOptions {
  expires?: number;
  responseContentType?: string;
  responseContentDisposition?: string;
}

// Background Job Types
export interface ThumbnailJob {
  fileId: string;
  s3Key: string;
  mimeType: string;
  sizes?: ThumbnailSize[];
}

export interface ThumbnailSize {
  name: string;
  width: number;
  height: number;
}

export interface MetadataExtractionJob {
  fileId: string;
  s3Key: string;
  mimeType: string;
}

export interface XmpProcessingJob {
  fileId: string;
  xmpS3Key: string;
  originalFilename: string;
}

// Search and Filter Types
export interface FileFilter {
  directoryId?: string;
  fileType?: string;
  mimeType?: string;
  startDate?: Date;
  endDate?: Date;
  keywords?: string[];
  rating?: number;
  hasVersions?: boolean;
  isVisible?: boolean;
}

export interface FileSort {
  field: 'name' | 'createdAt' | 'captureDate' | 'fileSize';
  direction: 'asc' | 'desc';
}

export interface SearchQuery {
  query?: string;
  filters?: FileFilter;
  sort?: FileSort;
  pagination?: {
    page?: number;
    limit?: number;
  };
}

export interface SearchOptions {
  query?: string;
  searchFields?: SearchField[];
  filters?: SearchFilters;
  sort?: SearchSort;
  pagination?: {
    page: number;
    limit: number;
  };
  includeVersionInfo?: boolean;
  includeRelatedFiles?: boolean;
}

export interface SearchFilters {
  fileTypes?: string[];
  mimeTypes?: string[];
  extensions?: string[];
  createdAfter?: Date;
  createdBefore?: Date;
  capturedAfter?: Date;
  capturedBefore?: Date;
  modifiedAfter?: Date;
  modifiedBefore?: Date;
  minSize?: number;
  maxSize?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  cameraMake?: string[];
  cameraModel?: string[];
  lensModel?: string[];
  minISO?: number;
  maxISO?: number;
  minAperture?: number;
  maxAperture?: number;
  minFocalLength?: number;
  maxFocalLength?: number;
  hasGPS?: boolean;
  nearLocation?: {
    latitude: number;
    longitude: number;
    radiusKm: number;
  };
  minRating?: number;
  maxRating?: number;
  keywords?: string[];
  excludeKeywords?: string[];
  hasVersions?: boolean;
  hasRAWVersion?: boolean;
  hasXMPSidecar?: boolean;
  isRAW?: boolean;
  directoryIds?: string[];
  excludeDirectoryIds?: string[];
}

export interface SearchField {
  field: 'filename' | 'originalFilename' | 'metadata' | 'keywords' | 'description' | 'cameraMake' | 'cameraModel' | 'all';
  weight?: number;
}

export interface SearchSort {
  field: 'relevance' | 'name' | 'createdAt' | 'captureDate' | 'fileSize' | 'rating';
  direction: 'asc' | 'desc';
}

export interface SearchResult {
  file: FileWithRelations;
  score: number;
  matchedFields: string[];
  snippet?: string;
  versionInfo?: {
    versionCount: number;
    hasRAWVersion: boolean;
    hasXMPSidecar: boolean;
    latestEditDate?: Date;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  searchStats: {
    totalMatches: number;
    searchTime: number;
    appliedFilters: string[];
    suggestedTerms?: string[];
  };
  facets?: {
    fileTypes: { [key: string]: number };
    cameraMakes: { [key: string]: number };
    years: { [key: string]: number };
  };
}

// Collection Types
export interface SmartCollectionCriteria {
  conditions: CollectionCondition[];
  operator: 'AND' | 'OR';
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'captureDate' | 'fileSize' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface CollectionCondition {
  field: CollectionField;
  operator: CollectionOperator;
  value: any;
  caseSensitive?: boolean;
}

export type CollectionField = 
  | 'filename'
  | 'originalFilename'
  | 'fileExtension'
  | 'mimeType'
  | 'fileSize'
  | 'width'
  | 'height'
  | 'createdAt'
  | 'captureDate'
  | 'cameraMake'
  | 'cameraModel'
  | 'lensModel'
  | 'iso'
  | 'aperture'
  | 'focalLength'
  | 'rating'
  | 'keywords'
  | 'description'
  | 'hasGPS'
  | 'hasVersions'
  | 'hasRAWVersion'
  | 'hasXMPSidecar'
  | 'isRAW'
  | 'directoryPath'
  | 'metadata';

export type CollectionOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'between'
  | 'in'
  | 'notIn'
  | 'exists'
  | 'notExists'
  | 'regex';

export interface CollectionCreateRequest {
  name: string;
  description?: string;
  type: 'manual' | 'smart';
  criteria?: SmartCollectionCriteria;
  fileIds?: string[];
  isPublic?: boolean;
}

export interface CollectionUpdateRequest {
  name?: string;
  description?: string;
  criteria?: SmartCollectionCriteria;
  isPublic?: boolean;
}

export interface CollectionResponse {
  collection: CollectionWithFiles;
  stats: {
    totalFiles: number;
    totalSize: number;
    fileTypes: { [key: string]: number };
    dateRange: {
      earliest?: Date;
      latest?: Date;
    };
  };
}

// File Tree Types
export interface FileTreeNode {
  id: string;
  name: string;
  type: 'file';
  size: number;
  mimeType: string;
  directoryId?: string;
  directoryPath?: string;
  createdAt: Date;
  modifiedAt: Date;
  captureDate?: Date | null;
  isRAW: boolean;
  dimensions?: {
    width: number;
    height: number;
  };
  versionCount?: number;
  hasRAWVersion?: boolean;
  hasXMPSidecar?: boolean;
  latestEditDate?: Date;
}

export interface DirectoryTreeNode {
  id: string;
  name: string;
  type: 'directory';
  path: string;
  createdAt: Date;
  modifiedAt: Date;
  children: DirectoryTreeNode[];
  files: FileTreeNode[];
  totalFiles: number;
  totalChildDirectories: number;
}

export interface TreeOptions {
  includeFiles?: boolean;
  maxDepth?: number;
  includeVersionInfo?: boolean;
  includeHiddenFiles?: boolean;
  recursive?: boolean;
  pagination?: {
    page: number;
    limit: number;
  };
  sortBy?: 'name' | 'createdAt' | 'captureDate' | 'size';
  sortOrder?: 'asc' | 'desc';
}