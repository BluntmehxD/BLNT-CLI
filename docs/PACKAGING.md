# BLNT-CLI Packaging Guide

## Overview

BLNT-CLI can be packaged as single executables for distribution using `pkg` or Node.js Single Executable Applications (SEA).

## Using pkg

### Installation

```bash
npm install -g pkg
```

### Building Executables

```bash
# Build for all platforms
pkg . --targets node18-linux-x64,node18-macos-x64,node18-win-x64 --output blnt

# Build for specific platform
pkg . --targets node18-linux-x64 --output blnt-linux
pkg . --targets node18-macos-x64 --output blnt-macos
pkg . --targets node18-win-x64 --output blnt-windows.exe
```

### Package.json Configuration

Add to package.json:

```json
{
  "pkg": {
    "scripts": "dist/**/*.js",
    "targets": ["node18-linux-x64", "node18-macos-x64", "node18-win-x64"],
    "outputPath": "build"
  }
}
```

## Using Node.js Single Executable Applications (SEA)

Node.js 20+ supports creating single executable applications natively.

### Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create SEA configuration** (`sea-config.json`):
   ```json
   {
     "main": "dist/index.js",
     "output": "sea-prep.blob",
     "disableExperimentalSEAWarning": true
   }
   ```

3. **Generate the blob**
   ```bash
   node --experimental-sea-config sea-config.json
   ```

4. **Create the executable**
   
   **Linux/macOS:**
   ```bash
   cp $(command -v node) blnt
   npx postject blnt NODE_SEA_BLOB sea-prep.blob \
     --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
     --macho-segment-name NODE_SEA
   ```

   **Windows:**
   ```cmd
   copy %NODE_DIR%\node.exe blnt.exe
   npx postject blnt.exe NODE_SEA_BLOB sea-prep.blob ^
     --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
   ```

## Distribution

### npm Package

Publish to npm:

```bash
npm login
npm publish
```

Install globally:

```bash
npm install -g blnt-cli
```

### Standalone Executables

Distribute the built executables from the `build/` directory:

- `blnt-linux` - Linux x64
- `blnt-macos` - macOS x64
- `blnt-windows.exe` - Windows x64

### GitHub Releases

1. Tag a release:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Create release on GitHub with built executables

## Post-Installation

After installation, users can verify:

```bash
blnt --version
blnt --help
blnt config get
```

## Development vs Production

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Platform-Specific Notes

### Linux
- Ensure executable permissions: `chmod +x blnt-linux`
- May need to install in `/usr/local/bin` for global access

### macOS
- May need to allow in Security & Privacy settings
- Code signing recommended for distribution

### Windows
- Add to PATH for global access
- May trigger Windows Defender on first run

## Size Optimization

To reduce executable size:

1. Use production dependencies only
2. Enable webpack/esbuild bundling
3. Exclude dev dependencies from build
4. Use terser for minification

## Troubleshooting

### "Module not found" errors
- Ensure all dependencies are bundled
- Check that dist/ contains all required files
- Verify import paths use `.js` extensions

### Large executable size
- Node.js is embedded (~50MB base)
- Consider using compression (UPX)
- Use dynamic linking where possible

### Runtime errors
- Test executable on target platform
- Check Node.js version compatibility
- Verify environment variable access

## Resources

- [pkg documentation](https://github.com/vercel/pkg)
- [Node.js SEA documentation](https://nodejs.org/api/single-executable-applications.html)
- [oclif deployment guide](https://oclif.io/docs/releasing)
