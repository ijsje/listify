$(function() {
   $('#convert').click(function() {
          result = parse({
             'lines'    : $('#text').val().trim().split('\n'),
             'format'   : $('#format').val(),
             'spaces'   : parseInt($('#spaces').val(), 10),
             'counter'  : parseInt($('#counter').val(), 10),
             'listType' : $('input[name=listtype]:checked').val(),
             'ignore'   : $('#ignore').is(':checked'),
             'pretty'   : $('#pretty').is(':checked')
          });
       $('#result').empty();
       $('<pre>').text(result).appendTo('#result');
       return false;
   });

   var parse = function(args) {
      var tags     = [],
          elements = [],
          lines    = args.lines,
          listType = args.listType || 'ul',
          format   = args.format   || '',
          spaces   = args.spaces   || 4,
          counter  = args.counter  || false,
          ignore   = args.ignore   || false,
          pretty   = args.pretty   || false,
          result   = '';

      if (format) {
         elements = format.split('>');
      }

      // Open the list
      result = '<' + listType + '>\n';

      // Skip blank lines
      lines = lines.map(function(line) {
         if (line.length > 0) {
            return line.trim();
         }
      });

      // Ignore first digits
      if (ignore) {
         lines = lines.map(function(line) {
            return line.replace(/^\d+\s*[-\\.)]?\s+/, ''); 
         });
      }

      lines.forEach(function(line) {
         result += new Array(spaces + 1).join(' ');
         elements.forEach(function(element, index) {
            var attrs = element.split('(');
            var tag   = attrs[0].trim();
            tags.push(tag);
            result += '<' + tag + ' ';
            var identifiers = attrs[1].split(',');
            identifiers.forEach(function(identifier) {
               if (counter !== false) {
                  identifier = identifier.replace('#', counter);
               }
               result += identifier.replace(')', '').replace(/'/g, '"').trim() + ' ';
            });
            result += '>';
            if (pretty) {
               if (index < elements.length - 1) {
                  result += "\n" + new Array(spaces * (index + 2) + 1).join(' ');
               }
            }
         });
         
         // No format, just <li>
         if (!format) { 
            result += '<li>'; 
         }

         result += line;
         
         if (!format) { 
            result += '</li>'; 
         }

         if (counter !== false) { 
            counter++; 
         }

         // Close tags
         var deep = tags.length;
         while (tags.length > 0) {
            result += '</' + tags.pop() + '>';
            if (pretty) {
               result += "\n" + new Array(spaces * (deep - 1) + 1).join(' ');
               deep--;
            }
         }
         result += '\n';
      });

      // Close the list
      result += '</' + listType + '>';

      // Prettyfy
      result = result.replace(/\s*>/g, '>');

      return result;
   }
   
   $('.examples a').click(function() {
      $('#format').val($(this).attr('data-code'));
   });
});
