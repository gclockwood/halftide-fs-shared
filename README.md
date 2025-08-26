# @halftide/shared

Shared types, constants, and utilities for the Halftide FS photo management system.

## Installation

```bash
npm install @halftide/shared
```

## Usage

### Types

Import TypeScript interfaces and types for the Halftide FS system:

```typescript
import { 
  User, 
  File, 
  FileWithRelations,
  Directory,
  Collection,
  ApiResponse,
  FileUploadRequest,
  SearchQuery 
} from '@halftide/shared';

// Use types for API responses
const response: ApiResponse<FileWithRelations[]> = {
  success: true,
  data: files
};
```

### Constants

Access predefined constants used across the system:

```typescript
import { 
  ALLOWED_FILE_TYPES,
  RAW_FILE_EXTENSIONS,
  FILE_RELATIONSHIP_TYPES,
  THUMBNAIL_SIZES,
  ERROR_CODES 
} from '@halftide/shared';

// Check if file type is allowed
if (ALLOWED_FILE_TYPES.includes(mimeType)) {
  // Process file
}

// Use error codes
throw new Error(ERROR_CODES.FILE_NOT_FOUND);
```

### Utilities

Use utility functions for common operations:

```typescript
import { 
  isRawFile,
  detectFileType,
  formatFileSize,
  generateS3Key,
  isValidEmail,
  calculatePagination,
  sanitizeFilename
} from '@halftide/shared';

// File type detection
const isRaw = isRawFile('IMG_1234.CR2'); // true
const fileType = detectFileType('photo.jpg', 'image/jpeg'); // FileType.jpeg

// File size formatting
const sizeStr = formatFileSize(1048576); // "1.0 MB"

// Generate S3 key
const s3Key = generateS3Key('user123', 'photo.jpg', 'file456');
// Returns: "user123/2024/03/photo_file456.jpg"

// Validation
const validEmail = isValidEmail('user@example.com'); // true

// Pagination
const pagination = calculatePagination(2, 50, 150);
// Returns: { page: 2, limit: 50, total: 150, totalPages: 3, hasNext: true, hasPrev: true }
```

## API

### Core Types

- **User**: User account information
- **File**: Photo/video file metadata
- **Directory**: File system directory structure
- **Collection**: Photo collections/albums
- **FileVersion**: File version relationships (RAW → JPEG, etc.)
- **FileMetadata**: Flexible metadata key-value pairs

### Extended Types

- **FileWithRelations**: File with loaded relations (directory, user, versions, metadata)
- **DirectoryWithFiles**: Directory with loaded files and subdirectories
- **CollectionWithFiles**: Collection with loaded files

### API Types

- **ApiResponse<T>**: Standard API response wrapper
- **PaginatedResponse<T>**: Paginated API responses
- **FileUploadRequest/Response**: File upload endpoints
- **SearchQuery/Response**: Search functionality
- **JwtPayload**: Authentication token payload

### File Processing Types

- **FileMetadataExtracted**: EXIF/metadata from image processing
- **CameraInfo**: Camera-specific metadata
- **XmpData**: XMP sidecar file data
- **ThumbnailJob**: Background thumbnail generation
- **S3UploadResult**: S3 upload responses

### Constants

- **ALLOWED_FILE_TYPES**: Supported MIME types
- **RAW_FILE_EXTENSIONS**: RAW photo file extensions
- **FILE_RELATIONSHIP_TYPES**: Version relationship types
- **THUMBNAIL_SIZES**: Standard thumbnail dimensions
- **PERMISSION_LEVELS**: Access control levels
- **ERROR_CODES**: Standardized error codes

### Utilities

#### File Operations
- `detectFileType()`: Determine file type from filename/MIME
- `isRawFile()`, `isJpegFile()`, etc.: File type checks
- `getXmpSidecarFilename()`: Generate XMP sidecar filename
- `generateS3Key()`: Create S3 object keys
- `sanitizeFilename()`: Clean filenames for storage

#### Formatting
- `formatFileSize()`: Human-readable file sizes
- `formatDate()`: Date formatting options
- `truncate()`: Truncate strings with ellipsis
- `slugify()`: Create URL-safe slugs

#### Validation
- `isValidEmail()`: Email format validation
- `isValidUsername()`: Username format validation
- `isValidPassword()`: Password strength validation

#### Pagination
- `calculatePagination()`: Generate pagination metadata
- `getPaginationOffset()`: Calculate query offsets

#### Array/Object Utilities
- `uniqueBy()`: Remove duplicates by key
- `groupBy()`: Group array elements by key
- `isDefined()`: Type-safe null/undefined checks

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Publishing

This package is published to GitHub Packages. Ensure you have proper authentication configured:

```bash
npm login --registry=https://npm.pkg.github.com
npm publish
```

## License

MIT