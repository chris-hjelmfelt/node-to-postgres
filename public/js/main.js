$(document).ready(function() {
  $('button.btn.delete-recipe').click(function(){
      var id = $(this).data('id');
      var url = '/delete/' +id;
      if (confirm('Delete Message?')){
          $.ajax({
              url: url,
              type: 'DELETE',
              success: function(result){
                  console.log('Deleting Message...');
                  window.location.href = '/';
              },
              error: function(err) {
                  console.log(err);
              }
          });
      }
  });
