//源码来源于 @NoughtQ 前辈
// Remove headerlinks of h1 elements
const h1Elements = document.querySelectorAll('h1');

h1Elements.forEach(h1 => {
    const headerLink = h1.querySelector('a.headerlink');
    
    if (headerLink) {
        headerLink.remove();
    }
});