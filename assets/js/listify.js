$(function() {
   var list_type = 'ul';
   var spaces = 4;
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

      if (format) {
         elements = format.split('>');
      }

      // Open the list
      result = '<' + list_type + '>\n';

      lines.forEach(function(line) {
         result += new Array(spaces + 1).join(' ');
         elements.forEach(function(element) {
            var attrs = element.split('(');
            var tag = attrs[0].trim();
            tags.push(tag);
            result += '<' + tag + ' ';
            var identifiers = attrs[1].split(',');
            console.log(identifiers);
            identifiers.forEach(function(identifier) {
               result += identifier.replace(')', '').replace(/'/g, '"').trim() + ' ';
            });
            result += '>';
         });
         
         // No format, just <li>
         if (!format) { result += '<li>'; }
         result += line;
         if (!format) { result += '</li>'; }

         // Close tags
         while (tags.length > 0) { result += '</' + tags.pop() + '>'; }

         result += '\n';
      });

      // Close the list
      result += '</' + list_type + '>';

      return result;
   }


/*
            tags.push(_attr);
            var attrs = element.split('(')[1].trim().replace(/'/g, '"').replace(/,/g, '').replace(/\)/g, '');
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
         });
         if (!elements.length) {
            result += '<li>' + line.trim() + '</li>';
         } else {
            result += line.trim();
         }
         for (var i = 0, length = tags.length; i < length; i++) {
            result += '</' + tags.pop() + '>';
         }         
         result += '\n';
         if (counter != '') counter += 1;
      });*/
      //result += '</' + list_type + '>';

/*
      return result;
   };*/

   $('.toolbar .btn').click(function() {
      list_type = $(this).attr('value');
   });

   $('.useit').click(function() {
      console.log($(this).prev().text());
      $('#format').val($(this).prev().text());
   });

});


