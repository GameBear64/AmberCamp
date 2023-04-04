const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createJWTCookie = (user) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: expireAt,
  });
};

exports.storedUserFields = ({ _id }) => ({ _id });

exports.isObjectID = (value, helper) => {
  return ObjectId.isValid(value) || helper.message('Invalid Id');
};

exports.chunkUnderMeg = (value, helper) => {
  return (
    Buffer.byteLength(value) <= 1048576 ||
    helper.message(`Chunk (${(Buffer.byteLength(value) / 1048576).toFixed(2)}MB) can not be over 1MB`)
  );
};

// https://stackoverflow.com/a/57071072/7149508
exports.chunkBuffer = function* (buf, maxBytes) {
  while (buf.length) {
    let i = buf.lastIndexOf(32, maxBytes + 1);
    if (i < 0) i = buf.indexOf(32, maxBytes);
    if (i < 0) i = buf.length;
    yield buf.slice(0, i).toString();
    buf = buf.slice(i + 1);
  }
};

// https://stackoverflow.com/a/1054862/7149508
// TODO: into middleware?
exports.slugifyString = (text) =>
  text
    ?.toLowerCase()
    ?.replace(/[^\w ]+/g, '')
    ?.replace(/ +/g, '-')
    ?.trim()
    ?.replace(/[^\x00-\x7F]/g, '')
    ?.substring(0, 200);

// TODO: make this into a separate middleware and include confusables
exports.sanitizeHTML = (string) => string?.replace(/\\/g, '')?.replace(/</g, '&lt;')?.replace(/>/g, '&gt;'); //.replace(/&/g, '&amp;').replace(///g, '&#x2F;');

const fileMimeType = {
  'application/annodex': 'anx',
  'application/font-sfnt': 'sfnt',
  'application/font-woff': 'woff',
  'application/font-woff2': 'woff2',
  'application/java': 'class',
  'application/java-archive': 'jar',
  'application/javascript': 'js',
  'application/json': 'json',
  'application/mac-binhex40': 'hqx',
  'application/mathml+xml': 'mathml',
  'application/msword': 'doc',
  'application/octet-stream': 'exe',
  'application/oda': 'oda',
  'application/ogg': 'ogx',
  'application/pdf': 'pdf',
  'application/pkix-cert': 'cer',
  'application/postscript': 'ps',
  'application/rdf+xml': 'rdf',
  'application/rtf': 'rtf',
  'application/vnd.mozilla.xul+xml': 'xul',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.ms-fontobject': 'eot',
  'application/vnd.ms-powerpoint': 'pps',
  'application/vnd.oasis.opendocument.chart': 'odc',
  'application/vnd.oasis.opendocument.database': 'odb',
  'application/vnd.oasis.opendocument.formula': 'odf',
  'application/vnd.oasis.opendocument.graphics': 'odg',
  'application/vnd.oasis.opendocument.graphics-template': 'otg',
  'application/vnd.oasis.opendocument.image': 'odi',
  'application/vnd.oasis.opendocument.presentation': 'odp',
  'application/vnd.oasis.opendocument.presentation-template': 'otp',
  'application/vnd.oasis.opendocument.spreadsheet': 'ods',
  'application/vnd.oasis.opendocument.spreadsheet-template': 'ots',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/vnd.oasis.opendocument.text-master': 'odm',
  'application/vnd.oasis.opendocument.text-template': 'ott',
  'application/vnd.oasis.opendocument.text-web': 'oth',
  'application/vnd.rn-realmedia': 'rm',
  'application/vnd.visio': 'vsd',
  'application/vnd.wap.wmlc': 'wmlc',
  'application/vnd.wap.wmlscriptc': 'wmlscriptc',
  'application/voicexml+xml': 'vxml',
  'application/wspolicy+xml': 'wspolicy',
  'application/x-aim': 'aim',
  'application/x-bcpio': 'bcpio',
  'application/x-cdf': 'cdf',
  'application/x-compress': 'z',
  'application/x-cpio': 'cpio',
  'application/x-csh': 'csh',
  'application/x-dvi': 'dvi',
  'application/x-font-opentype': 'otf',
  'application/x-font-ttf': 'ttf',
  'application/x-gtar': 'gtar',
  'application/x-gzip': 'gz',
  'application/x-hdf': 'hdf',
  'application/x-java-jnlp-file': 'jnlp',
  'application/x-latex': 'latex',
  'application/x-mif': 'mif',
  'application/x-netcdf': 'nc',
  'application/x-sh': 'sh',
  'application/x-shar': 'shar',
  'application/x-shockwave-flash': 'swf',
  'application/x-stuffit': 'sit',
  'application/x-sv4cpio': 'sv4cpio',
  'application/x-sv4crc': 'sv4crc',
  'application/x-tar': 'tar',
  'application/x-tcl': 'tcl',
  'application/x-tex': 'tex',
  'application/x-texinfo': 'texinfo',
  'application/x-ustar': 'ustar',
  'application/x-wais-source': 'src',
  'application/xhtml+xml': 'xhtml',
  'application/xml': 'xsl',
  'application/xml-dtd': 'dtd',
  'application/xslt+xml': 'xslt',
  'application/xspf+xml': 'xspf',
  'application/zip': 'zip',
  'audio/annodex': 'axa',
  'audio/basic': 'ulw',
  'audio/flac': 'flac',
  'audio/midi': 'midi',
  'audio/mpeg': 'mpa',
  'audio/ogg': 'spx',
  'audio/x-aiff': 'aiff',
  'audio/x-mpeg': 'mpega',
  'audio/x-mpegurl': 'm3u',
  'audio/x-scpls': 'pls',
  'audio/x-wav': 'wav',
  'image/bmp': 'dib',
  'image/gif': 'gif',
  'image/ief': 'ief',
  'image/jpeg': 'jpg',
  'image/pict': 'pict',
  'image/png': 'png',
  'image/svg+xml': 'svgz',
  'image/tiff': 'tiff',
  'image/vnd.adobe.photoshop': 'psd',
  'image/vnd.wap.wbmp': 'wbmp',
  'image/x-cmu-raster': 'ras',
  'image/x-jg': 'art',
  'image/x-macpaint': 'pnt',
  'image/x-portable-anymap': 'pnm',
  'image/x-portable-bitmap': 'pbm',
  'image/x-portable-graymap': 'pgm',
  'image/x-portable-pixmap': 'ppm',
  'image/x-quicktime': 'qtif',
  'image/x-rgb': 'rgb',
  'image/x-xbitmap': 'xbm',
  'image/x-xpixmap': 'xpm',
  'image/x-xwindowdump': 'xwd',
  'model/vrml': 'wrl',
  'text/css': 'css',
  'text/html': 'html',
  'text/plain': 'txt',
  'text/richtext': 'rtx',
  'text/tab-separated-values': 'tsv',
  'text/troff': 'tr',
  'text/vnd.sun.j2me.app-descriptor': 'jad',
  'text/vnd.wap.wml': 'wml',
  'text/vnd.wap.wmlsc': 'wmls',
  'text/x-component': 'htc',
  'text/x-java-source': 'java',
  'text/x-setext': 'etx',
  'video/annodex': 'axv',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpg',
  'video/mpeg2': 'mpv2',
  'video/ogg': 'ogv',
  'video/quicktime': 'qt',
  'video/x-dv': 'dv',
  'video/x-ms-asf': 'asx',
  'video/x-ms-wmv': 'wmv',
  'video/x-msvideo': 'avi',
  'video/x-rad-screenplay': 'avx',
  'video/x-sgi-movie': 'movie',
};

exports.typeFromMime = (mime) => fileMimeType[mime];
