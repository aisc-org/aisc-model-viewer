// Most things need to access items relative to the site root, which is not
// necessarily '/'. But the bundles are always output to the site root,
// regardless of the HTML they're attached to.
let _siteRoot: string
const bundle = document.currentScript as HTMLScriptElement

// Ex: main bundle is at https://somesite.org/model/index.js
// bundle.src -> 'https://somesite.org/model/index.js'
// .split('/') -> ['https:', '', 'somesite.org', 'model', 'index.js']
// .slice(3, -1) -> ['model']
// '/' + _.join('/') -> '/model'
_siteRoot = '/' + bundle.src.split('/').slice(3, -1).join('/')
if (_siteRoot !== '/') {
    // Usually we want a trailing slash, but sometimes, our site root is
    // actually '/', and so we don't that to turn into '//'.
    _siteRoot += '/'
}
export const siteRoot = _siteRoot
