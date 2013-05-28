$(function() {
   var type   = 'ul';
   var default_counter = 0;
   $('#convert').click(function() {
          result = parse({
             'lines'    : $('#text').val().trim().split('\n'),
             'format'   : $('#format').val(),
             'spaces'   : $('#spaces').val(),
             'counter'  : $('#counter').val(),
          });
       $('#result').empty();
       $('<pre>').text(result).appendTo('#result');
       //$('#formatted-code').val(result);
   });

   var parse = function(args) {
      var tags     = [],
          elements = [],
          result   = '',
          lines    = args.lines,
          format   = args.format || '',
          counter  = parseInt(args.counter, 10);

      if (format != '') {
         elements = format.split('>');
      }
      console.log(elements);
      result = '<' + type + '>\n';
      for (var k = 0, lines_length = lines.length; k < lines_length; k++) {
         result += '   ';
         for (var i = 0, length = elements.length; i < length; i++) {
            tags.push(elements[i].split('(')[0].trim());
            var attrs = elements[i].split('(')[1].trim().replace(/'/g, '"').replace(/,/g, '').replace(/\)/g, '');
            console.log(attrs);
            var moreattrs = attrs.split('=')[0];
            var values = attrs.split('=')[1];
            var newattrs = '';
            if (moreattrs == 'id') {
               if (isNaN(counter)) counter = '';
               newattrs = ' ' + moreattrs + '=' + values.substring(0, values.length - 1)  + counter + '"';
            } else {
               newattrs = (attrs == '') ? attrs : ' ' + attrs;
            }
            result += '<' + tags[i];
            //result += (attrs == '') ? attrs : ' ' + attrs;
            result += newattrs;
            result += '>';
         }
         if (!elements.length) {
            result += '<li>' + lines[k].trim() + '</li>';
         } else {
            result += lines[k].trim();
         }
         for (var i = 0, length = tags.length; i < length; i++) {
            result += '</' + tags.pop() + '>';
         }         
         result += '\n';
         if (counter != '') counter += 1;
      }
      result += '</' + type + '>';


      return result;
   };

   $('.toolbar .btn').click(function() {
      type = $(this).attr('value');
   });

   $('.useit').click(function() {
      console.log($(this).prev().text());
      $('#format').val($(this).prev().text());
   });

});


