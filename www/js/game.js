var _items_num = 16;



var nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
var gen_nums = [];

function in_array(array, el) {
   for(var i = 0 ; i < array.length; i++) 
       if(array[i] == el) return true;
   return false;
}

function get_rand(array) {
    var rand = array[Math.floor(Math.random()*array.length)];
    if(!in_array(gen_nums, rand)) {
       gen_nums.push(rand); 
       return rand;
    }
    return get_rand(array);
}


var images = [];

// get images, place them in an array & randomize the order
for (var i = 0; i < _items_num / 2; i++) { 
  //var rand = Math.floor(Math.random() * (1200 - 900 + 1) + 900); 
  //var rand = Math.floor(Math.random() * 32) + 1;
  var rand = get_rand(nums);
  var img = 'img/' + rand + '.jpg';
  images.push(img);
  images.push(img);
}
randomizeImages();

// output images then hide them
var output = "<ol>"; 
for (var i = 0; i < _items_num; i++) { 
  output += "<li>";
  output += "<img src = '" + images[i] + "'/>";
  output += "</li>";
}
output += "</ol>";
document.getElementById("container").innerHTML = output;
$("img").hide();

var guess1 = "";
var guess2 = "";
var count = 0;

$("li").click(function() {
	
  if ((count < 2) &&  ($(this).children("img").hasClass("face-up")) === false) {
    
    // increment guess count, show image, mark it as face up
    count++;
    $(this).children("img").show();
    $(this).children("img").addClass("face-up");
    
    //guess #1
    if (count === 1 ) { 
      guess1 = $(this).children("img").attr("src"); 
    }   
    
    //guess #2
    else { 
      guess2 = $(this).children("img").attr("src"); 
	  
		console.log(guess1 + " === " + guess2);

      // since it's the 2nd guess check for match
      if (guess1 === guess2) { 
        console.log("match");
		$("li").children("img[src='" + guess2 + "']").addClass("match");
        $("li").children("img[src='" + guess2 + "']").after( $('<svg class="icon"><use xlink:href="#checkbox" /></svg>') );
		
		//$('img:not(.match)').hide().removeClass("face-up");
		
		
      } 
      
      // else it's a miss
      else { 
        console.log("miss");
        setTimeout(function() {
          $("img").not(".match").hide();
          $("img").not(".match").removeClass("face-up");
        }, 1000);
	  
      }
      
 		// reset
		count = 0; 
      setTimeout(function() { console.clear(); }, 60000);      
    }
  }
	
});



// randomize array of images
function randomizeImages(){
  Array.prototype.randomize = function()
  {
    var i = this.length, j, temp;
    while ( --i )
    {
      j = Math.floor( Math.random() * (i - 1) );
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
  };
  
  images.randomize();
}