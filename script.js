function generateAccordionCode() {
    var question = document.getElementById('question').value;
    var description = document.getElementById('description').value;
    var bulletPoints = document.getElementById('bullet-points').value.split('\n');
  
    var accordionCode = '[su_accordion][su_spoiler title="' + question + '" open="no" style="default" icon="plus" anchor="" anchor_in_url="no" class=""]\n';
    accordionCode += processText(description) + '\n<ul>\n';
    bulletPoints.forEach(function(point) {
      if (point.trim() !== '') {
        accordionCode += '\t<li style="list-style-type: disc;">' + processText(point.trim()) + '</li>\n';
      }
    });
    accordionCode += '</ul>\n[/su_spoiler][/su_accordion]';
  
    document.getElementById('accordion-code').innerText = accordionCode;
  }
  
  function generateLinkCode() {
    var word = document.getElementById('word').value;
    var link = document.getElementById('link').value;
  
    var linkCode = '<a href="' + link + '">' + word + '</a>';
  
    document.getElementById('link-code').innerText = linkCode;
  }
  
  function processText(text) {
    var regex = /(\[.*?\])(.*?)(\[\/.*?\])/g;
    var processedText = text.replace(regex, function(match, p1, p2, p3) {
      var linkText = p2;
      var href = '';
  
      if (p1.includes('=')) {
        var parts = p1.split('=');
        linkText = parts[0].slice(1);
        href = ' href="' + parts[1].slice(0, -1) + '"';
      }
  
      return '<a' + href + '>' + linkText + '</a>' + p3;
    });
  
    return processedText;
  }

//   copy code function

function copyToClipboard() {
    var codeElement = document.getElementById('accordion-code');
    var code = codeElement.innerText;
  
    // Create a textarea element to hold the code
    var textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
  
    // Select the code in the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the selected code to the clipboard
    document.execCommand('copy');
  
    // Remove the temporary textarea
    document.body.removeChild(textarea);
  
    // Show a message indicating the code is copied
    alert('Code copied to clipboard!');
  }