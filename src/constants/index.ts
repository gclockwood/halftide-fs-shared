// File type constants
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png', 
  'image/tiff',
  'image/tiff;format=raw',
  'image/x-canon-cr2',
  'image/x-canon-crw',
  'image/x-nikon-nef',
  'image/x-sony-arw',
  'image/x-adobe-dng',
  'image/x-panasonic-raw',
  'image/x-olympus-orf',
  'image/x-fuji-raf',
  'image/x-pentax-pef',
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'application/rdf+xml', // XMP sidecar
  'text/xml' // XMP sidecar
] as const;

export const RAW_FILE_EXTENSIONS = [
  '.cr2', '.cr3', '.crw', // Canon
  '.nef', '.nrw',         // Nikon  
  '.arw', '.srf', '.sr2', // Sony
  '.orf',                 // Olympus
  '.raf',                 // Fujifilm
  '.pef', '.ptx',         // Pentax
  '.rw2',                 // Panasonic
  '.dng',                 // Adobe DNG
  '.3fr',                 // Hasselblad
  '.fff',                 // Imacon
  '.mef',                 // Mamiya
  '.mos',                 // Leaf
  '.mrw',                 // Minolta
  '.x3f'                  // Sigma
] as const;

export const JPEG_EXTENSIONS = ['.jpg', '.jpeg'] as const;
export const TIFF_EXTENSIONS = ['.tif', '.tiff'] as const;
export const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.wmv'] as const;
export const XMP_EXTENSIONS = ['.xmp'] as const;

// File relationship types
export const FILE_RELATIONSHIP_TYPES = {
  EDIT: 'edit',
  SIDECAR: 'sidecar', 
  DERIVATIVE: 'derivative',
  THUMBNAIL: 'thumbnail',
  PROXY: 'proxy'
} as const;

// Thumbnail sizes
export const THUMBNAIL_SIZES = {
  SMALL: { name: 'small', width: 150, height: 150 },
  MEDIUM: { name: 'medium', width: 300, height: 300 },
  LARGE: { name: 'large', width: 800, height: 800 },
  XLARGE: { name: 'xlarge', width: 1200, height: 1200 }
} as const;

// Permission levels
export const PERMISSION_LEVELS = {
  READ: 'read',
  WRITE: 'write', 
  ADMIN: 'admin'
} as const;

// Resource types for permissions
export const RESOURCE_TYPES = {
  FILE: 'file',
  DIRECTORY: 'directory',
  COLLECTION: 'collection'
} as const;

// Audit log actions
export const AUDIT_ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  UPLOAD: 'upload',
  DOWNLOAD: 'download',
  LOGIN: 'login',
  LOGOUT: 'logout'
} as const;

// Default pagination settings
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 50,
  MAX_LIMIT: 1000
} as const;

// Metadata data types
export const METADATA_DATA_TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  JSON: 'json'
} as const;

// Collection types
export const COLLECTION_TYPES = {
  MANUAL: 'manual',
  SMART: 'smart'
} as const;

// Search sort fields
export const SEARCH_SORT_FIELDS = {
  RELEVANCE: 'relevance',
  NAME: 'name',
  CREATED_AT: 'createdAt',
  CAPTURE_DATE: 'captureDate',
  FILE_SIZE: 'fileSize',
  RATING: 'rating'
} as const;

// Sort directions
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

// File processing states
export const PROCESSING_STATES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
} as const;

// Common camera makes
export const CAMERA_MAKES = [
  'Canon',
  'Nikon', 
  'Sony',
  'Fujifilm',
  'Olympus',
  'Panasonic',
  'Pentax',
  'Leica',
  'Hasselblad',
  'Phase One'
] as const;

// Error codes
export const ERROR_CODES = {
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED', 
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  DIRECTORY_NOT_FOUND: 'DIRECTORY_NOT_FOUND',
  COLLECTION_NOT_FOUND: 'COLLECTION_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  DUPLICATE_FILE: 'DUPLICATE_FILE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  PROCESSING_FAILED: 'PROCESSING_FAILED',
  INSUFFICIENT_STORAGE: 'INSUFFICIENT_STORAGE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
} as const;