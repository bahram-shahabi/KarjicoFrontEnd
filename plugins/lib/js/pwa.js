// Service Worker Register
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('service-worker.js')
//       .then(registration => {
//         //console.log('Service Worker is registered', registration);
//       })
//       .catch(err => {
//         console.error('Registration failed:', err);
//       });
//   });
// }
if ($("#countdown").length>0) {
  $("#countdown").flipTimer({
    date:$("#time1").val(),
    dayTextNumber:"auto",
    bgColor:"#fff",
    dividerColor:"#666",
    digitColor:"#333",
    textColor:"#fff",
    boxShadow:false,

    //Expire
    expireType:"message", //message, hide, redirect
    message:"Sorry, you are too late!",
    redirect:""
  });
}
$( "#id1" ).addClass( "counter" );

if ($("#countdown2").length>0) {
  $("#countdown2").flipTimer({
    date:$("#time1").val(),
    dayTextNumber:"auto",
    bgColor:"#fff",
    dividerColor:"#666",
    digitColor:"#333",
    textColor:"#fff",
    boxShadow:false,

    //Expire
    expireType:"message", //message, hide, redirect
    message:"Sorry, you are too late!",
    redirect:""
  });
}
$( "#id2" ).addClass( "counter" );

if ($("#countdown3").length>0) {
  $("#countdown3").flipTimer({
    date:$("#time1").val(),
    dayTextNumber:"auto",
    bgColor:"#fff",
    dividerColor:"#666",
    digitColor:"#333",
    textColor:"#fff",
    boxShadow:false,

    //Expire
    expireType:"message", //message, hide, redirect
    message:"Sorry, you are too late!",
    redirect:""
  });
}
$( "#id3" ).addClass( "counter" );
