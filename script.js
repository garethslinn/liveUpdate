//firebase reference
var dbRef = new Firebase("https://fir-6ccb1.firebaseio.com/");
var articlesRef = dbRef.child('articles');

console.log(articlesRef);

//load older records
articlesRef.on("child_added", function(snap) {
  console.log("added", snap.key(), snap.val());
  document.querySelector('#articles').innerHTML += (articleHtmlFromObject(snap.val()));
});

//save article
document.querySelector('.addValue').addEventListener("click", function( event ) {  
  event.preventDefault();
  if( document.querySelector('#name').value != '' || document.querySelector('#email').value != '' ){
    articlesRef
      .push({
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
        url: document.querySelector('#url').value,
        image: document.querySelector('#image').value,
        timestamp: Math.floor(Date.now() / 1000)
      });
      articleForm.reset();
  } else {
    alert('Please fill atlease name or email!');
  }
}, false);

function articleHtmlFromObject(article){
  console.log( article );
  var html = '';
  html += '<li class="list-group-item article">';
    html += '<a href="'+article.url+'">';
      html += '<h1>'+article.name+'</h1>';
      html += '<h2>'+article.description+'</h2>';
      html += '<img src="img/'+article.image+'" height="100" width="auto" />';
    html += '</a>';
  html += '</li>';
  return html;
}