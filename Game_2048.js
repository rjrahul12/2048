var grid;
var score = 0;
var flag = true;

function main()
{ 
	console.log("startMain");

	begin();
	document.addEventListener('keydown', move);
	$("#newGame").click(begin);

	console.log("endMain");
}

window.addEventListener('load', function(){
	main();
});

function begin()
{
	flag = true;
	score = 0;
	console.log("startBegin");
	grid = [[' ', ' ', ' ', ' '], [ ' ', ' ', ' ', ' '], [ ' ', ' ', ' ', ' '], [ ' ', ' ', ' ', ' ']];
	insert();
	insert();
	display();
	console.log("endBegin");
}

function move(event)
{
	flag = false;
	console.log("startMove");
	if(event.keyCode == 39)
	{ moveRight();

	}
	else if(event.keyCode == 37)
	{ moveLeft();

	}
	else if(event.keyCode == 38)
	{ moveUp();

	}
	else if(event.keyCode == 40)
	{ moveDown();

	} 
	console.log("endMove");

}	

function shift(row, type)
{	var status = false;
	if(type == 'right')
	{ for(var times=1; times<=3; times++)
	  { var j = 3;
	    while(j>0)
	    { if(grid[row][j] == ' ' && grid[row][j-1] != ' ')
		  { grid[row][j] = grid[row][j-1];
		  	grid[row][j-1] = ' ';
		  	status = true
		  }
		  j--;
	    }
	  }
	}
	else if(type == 'down')
	{ for(var times=1; times<=3; times++)
	  { var j = 3;
	    while(j>0)
	    { if(grid[j][row] == ' ' && grid[j-1][row] != ' ')
		  { grid[j][row] = grid[j-1][row];
		  	grid[j-1][row] = ' ';
		  	status = true
		  }
		  j--;
	    }
	  }
	}
	else if(type == 'up')
	{ for(var times=1; times<=3; times++)
	  { var j = 0;
	    while(j<3)
	    { if(grid[j][row] == ' ' && grid[j+1][row] != ' ')
	 	  { grid[j][row] = grid[j+1][row];
	  	  	grid[j+1][row] = ' ';
			status = true
		  }
		  j++;
		}
	  } 
	}
	else if(type == 'left')
	{ for(var times=1; times<=3; times++)
	  { var j = 0;
	    while(j<3)
	    { if(grid[row][j] == ' ' && grid[row][j+1] != ' ')
		  { grid[row][j] = grid[row][j+1];
		  	grid[row][j+1] = ' ';
		  	status = true
		  }
		  j++;
	    }
	  }
	}
	return status
}

function moveRight()
{ 
	console.log("startMoveRight");

	var status = false;
	for(var i=0; i<4; i++)
	{ if(status == false)
	  status = shift(i, 'right');
	  else
	  shift(i, 'right');

	  var j=3;
	  while(j>0)
	  { if(grid[i][j] == grid[i][j-1] && grid[i][j] != ' ')
 		{ grid[i][j] *= 2;
 		  grid[i][j-1] = ' ';
 		  score = score + grid[i][j];
 		  status = shift(i, 'right');
 		}
 		j--;
	  }
	}
	flag = flag || status;
	if(status)
	insert()
	
	display();
	console.log("endMoveRight");

}

function moveLeft()
{
	console.log("startMoveLeft");

	var status = false
	for(var i=0; i<4; i++)
	{ if(status == false)
	  status = shift(i, 'left');
	  else
	  shift(i, 'left');

	  var j=0;
	  while(j<3)
	  { if(grid[i][j] == grid[i][j+1] && grid[i][j] != ' ')
 		{ grid[i][j] *= 2;
 		  grid[i][j+1] = ' ';
 		  score = score + grid[i][j];
 		  status = shift(i, 'left');
 		}
 		j++;
	  }
	}
	flag = flag || status;
	if(status)
	insert()
	
	display();
	console.log("endMoveleft");
}

function moveUp()
{
	console.log("startMoveUp");
	var status = false
	for(var i=0; i<4; i++)
	{ if(status == false)
	  status = shift(i, 'up');
	  else
	  shift(i, 'up');

	  var j=0;
	  while(j<3)
	  { if(grid[j][i] == grid[j+1][i] && grid[j][i] != ' ')
 		{ grid[j][i] *= 2;
 		  grid[j+1][i] = ' ';
 		  score = score + grid[j][i];
 		  status = shift(i, 'up');
 		}
 		j++;
	  }
	}
	flag = flag || status;
	if(status)
	insert();
	
	display();
	console.log("endMoveUp");

	
}

function moveDown()
{
	console.log("startMoveDeown");
	
	var status = false
	for(var i=0; i<4; i++)
	{ if(status == false)
	  status = shift(i, 'down');
	  else
	  shift(i, 'down');

	  var j=3;
	  while(j>0)
	  { if(grid[j][i] == grid[j-1][i] && grid[j][i] != ' ')
 		{ grid[j][i] *= 2;
 		  grid[j-1][i] = ' ';
 		  score = score + grid[j][i];
 		  status = shift(i, 'down');
 		}
 		j--;
	  }
	}
	flag = flag || status;
	if(status)
	insert()
	
	display();

	display();
	console.log("endMoveDown");
	
}

function insert()
{
	console.log("startInsert");
	$("#points").html(score);
	if(flag == true)
	{ while(true)
	  { var row = Math.floor(Math.random() * 4);
	    var col = Math.floor(Math.random() * 4);
	    if(grid[row][col] == ' ')
	    { grid[row][col] = 2;
	   	  break;
	    } 
	  }
	}
	else
		alert("Game Over");

	console.log("endInsert");

}

function display()
{
	console.log("startDisplay");
	for(var i=0; i<=3; i++)
	{ for(var j=0; j<=3; j++)
		$("#pos" + i + j).html(grid[i][j]);
		if(grid[i][j] == 2048)
		alert("You Win")	
	}

	for(var i=0; i<=3; i++)
	{ for(var j=0; j<=3; j++)
	  { if(grid[i][j] == 2)
	  	{ $("#pos" + i + j).css("background-color", "#eee4da");
	  	  $("#pos" + i + j).css("color", "#776e65");
	  	}
	  	else if(grid[i][j] == 4)
	  	{ $("#pos" + i + j).css("background-color", "#eee1c9");
	      $("#pos" + i + j).css("color", "#776e65");
	  	}
	  	else if(grid[i][j] == 8)
	  	{ $("#pos" + i + j).css("background-color", "#f3b27a");
	      $("#pos" + i + j).css("color", "#f9f6f2");
	  	}
	  	else if(grid[i][j] == 16)
	  	{ $("#pos" + i + j).css("background-color", "#f69664");
	      $("#pos" + i + j).css("color", "#f9f6f2");
	  	}
	  	else if(grid[i][j] == 32)
	  	{ $("#pos" + i + j).css("background-color", "#f77c5f");
	  	  $("#pos" + i + j).css("color", "#f9f6f2");
	  	}
	  	else if(grid[i][j] == 64)
	  	{ $("#pos" + i + j).css("background-color", "#f75f3b");
	  	  $("#pos" + i + j).css("color", "#f9f6f2");
	  	}
	  	else if(grid[i][j] == 128)
	  	{ $("#pos" + i + j).css("background-color", "#edd073");
	  	  $("#pos" + i + j).css("color", "#f9f6f2");
	  	  $("#pos" + i + j).css("font-size", "50px");
	  	}
	  	else if(grid[i][j] == 256)
	  	{ $("#pos" + i + j).css("background-color", "#edcc62");
	  	  $("#pos" + i + j).css("color", "#f9f6f2");
	  	  $("#pos" + i + j).css("font-size", "50px");
	  	}
	  	else
	  	{ $("#pos" + i + j).css("background-color", "#cdc1b4");
	  	}
	  }

	}
	console.log("endDisplay");

}

