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

  $('button.btn.edit-recipe').click(function(){
      $('#edit-form-id').val($(this).data('id'));
      $('#edit-form-name').val($(this).data('name'));
      $('#edit-form-date').val($(this).data('date'));
      $('#edit-form-directions').val($(this).data('directions'));        
  });
});