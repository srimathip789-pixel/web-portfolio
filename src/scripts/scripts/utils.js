export function fetchData(url) {
    return fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
export function createElement(tag, className, innerHTML) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
}
export function appendToParent(parent, child) {
    parent.appendChild(child);
}
//# sourceMappingURL=utils.js.map