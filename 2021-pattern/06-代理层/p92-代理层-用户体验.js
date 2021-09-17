// 源行为
let loadImg = function (src) {
    const imgNode = new Image()
    document.body.appendChild(imgNode)
    imgNode.src = src

    return imgNode
}

// 代理为本体提供代理服务。代理拒绝或延后对本体的访问。或者在访问本体前做一些额外逻辑，不同于装饰器/AOP这些额外逻辑围绕于本体。

// 控制优化层
const loadSrcProxy = function (loadImg) {
    return function(src){
        const img = loadImg(
         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAABLCAMAAAB0mIpRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3MEVEQkVGMzhGNDExRTU4OUQ2OTZGRTIxQ0U2OUI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ3MEVEQkYwMzhGNDExRTU4OUQ2OTZGRTIxQ0U2OUI2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDcwRURCRUQzOEY0MTFFNTg5RDY5NkZFMjFDRTY5QjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDcwRURCRUUzOEY0MTFFNTg5RDY5NkZFMjFDRTY5QjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5KmW6xAAAABlBMVEX///////9VfPVsAAAAAnRSTlP/AOW3MEoAAAO4SURBVHja7JvpcsMgDIRX7//Snc44Ext0rMThpg4/2jRxDB8IHYsLeWQDf+Vvexw2MJX75im8ERsfgI0F2FvBr53di42N1JfeHoX97m879nEP7OVue1uD7Vx33OQ27OPnEqsEy30H9e/vZdgB9x2LfXqxDhuW8ePdNjnvhrqOHQ3ZgLq6M2y1bJzmu7zawagNrL3uDE4bwEYNe58Tn4bNJpc2NraGrmFsmYy9N3ThYmfk3oaW1bqDD7F3QzdbFfQyT8DesNivWKF3Rwewk10MYhf3ViXlR4t9fHD6i94ZKjbYuI0R6pznvWIfa9/0DdYJtqE6hT3kTlMT1d0ZLbZTgakDPL2gjHxS9MxcqmGrmSGH3ZZOYb7Sxzq0+fgKbPTLoRe6YLyZ6ocDbN1Iy9Spa21sTmaAYawl9a5f7qXYOK99VV0Zzyt7K5fV2E1+llZOU7ZpXFFNi8tGrmalCezkWE2JoWYwBcu4qAtK+CKw80tkSgy1bXLlKKXgyGKj9xJV7uHVjr/YZpN2qgAeegwbVaXYcsY2tjRGnsKGWsCUdyPK5wK8mbywvezQxW6Nu4rdiW9VfYP6lpaW8tiwjDvj01pnMCjrsNRQhbs4OVXnpojt1yPT8yRja2myJQLBbQAbURm2gBrGbrOSU21Qbe1VwDYHwNwqOUtdAtp22iWn8Ars6ztKiRUXQlCxiQOGjG3oeo4h9jh99O+dt3seu3N3gTozUv20vgmKFmyYkxv4Mtj9GVRUYgxiI6BW9raqM9SwxcBmxbgqdjfruvJvTIohBoWJi47dvB/h1NU3pheQ+6OCrfjY/qRZkuC0+3er1m3Y1Tqs32Wc//e1GRjCq+YMef2w9xLV8lMdAp8vNEvnYmt2aEaypPxVgKawrek0tghCu1KroPj8qw+VoxK581Xn1ry6cok3WiQTMNjDR2AwkrtUbZrG7irWtyUMYudqEEaktz/WO0bStojBh9gF6rBfAjrw5AamkP40HEGY5dm9hHGTtgF/mr3COefR+rRl1llIRYKD12MQEQawiw94lYg5bHGWmlluinrlk7ZKrDUKz4xzLGOnnvCagm1XeuCmbAK2qvksxZY0treDuUiCyNGutnI9HLulCJcSpbB1FyHLuCWLHaUWVRuXXdRe8pU5HmBuRJnCDhOnloEpV1Zgb/hvR48FFbWylqzsbgx2SrX6DGyJs7SsVhdm5CJ/iltI7Lke5GZsRzmd9Nzzn8K2wyS29XQbuDwQ2xqlPLJ9sb/YX+wv9j9qPwIMAGQPOCcACnDkAAAAAElFTkSuQmCC'
        )
        const proxy = new Image()
        proxy.src = src // 开始下载
        proxy.onload = ()=> img.src = proxy.src
    }

}
loadImg = loadSrcProxy(loadImg)

loadImg( './mao.jpg')
