/**
 * Created by Eric on 2015/12/23.
 */
window.onload = function () {
    var btn = document.createElement('button');
    btn.id = 'btnOK';
    btn.innerHTML = '确定';
    //btn.style.width = '100px';
    //btn.style.height = '40px';
    btn.onclick = function () {
        alert('购买物品为：机械键盘');
    }
    document.body.appendChild(btn);
}