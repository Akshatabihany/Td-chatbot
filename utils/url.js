
function geturl()
{
var x=location.search
const usp = new URLSearchParams(x)
const t=usp.toString()
console.log(usp.toString())
const name=usp.get('username')
console.log(name)
return {t};
}
function getname()
{
var x=location.search
const usp = new URLSearchParams(x)
const t=usp.toString()
console.log(usp.toString())
const name=usp.get('username')
console.log(name)
return {name};
}
module.exports = {
  getname,geturl
};
