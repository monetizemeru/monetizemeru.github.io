(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Bed = function() {
	this.initialize(img.Bed);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,555,293);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.text = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// text
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgvBUIAAgfIgXAAIAAgVIAXAAIAAgRIgXAAIAAgUIAXAAIAAhOIBBAAQAYAAAPANQAOANAAAYQAAAXgOAMQgPANgYAAIgrAAIAAARIBAAAIAAAVIhAAAIAAAfgAgZgFIArAAQAOAAAIgIQAJgHAAgNQAAgOgJgHQgIgHgOAAIgrAAg");
	this.shape.setTransform(51.875,3.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag7AwIAYAAQAIARAXABQATgBAMgPQAMgQABgeQgHAJgMAFQgLAFgNAAQgZAAgQgQQgRgOAAgYQAAgWARgRQARgQAaAAQAcAAASAUQARAUAAArQAAARgEAQQgDAPgIANQgHANgOAIQgNAIgQAAQgpAAgPgngAgbg4QgLAKAAAPQAAAPALAKQAKAIARAAQAPAAAKgIQALgKAAgPQAAgPgLgKQgLgJgOAAQgQAAgLAJg");
	this.shape_1.setTransform(30.475,3.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag7AwIAYAAQAIARAXABQATgBAMgPQAMgQABgeQgHAJgMAFQgLAFgNAAQgZAAgQgQQgRgOAAgYQAAgWARgRQARgQAaAAQAcAAASAUQARAUAAArQAAARgEAQQgDAPgIANQgHANgOAIQgNAIgQAAQgpAAgPgngAgbg4QgLAKAAAPQAAAPALAKQAKAIARAAQAPAAAKgIQALgKAAgPQAAgPgLgKQgLgJgOAAQgQAAgLAJg");
	this.shape_2.setTransform(15.275,3.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag7AwIAYAAQAIARAXABQATgBAMgPQAMgQABgeQgHAJgMAFQgLAFgNAAQgZAAgQgQQgRgOAAgYQAAgWARgRQARgQAaAAQAcAAASAUQARAUAAArQAAARgEAQQgDAPgIANQgHANgOAIQgNAIgQAAQgpAAgPgngAgbg4QgLAKAAAPQAAAPALAKQAKAIARAAQAPAAAKgIQALgKAAgPQAAgPgLgKQgLgJgOAAQgQAAgLAJg");
	this.shape_3.setTransform(0.125,3.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag2BVIAAgVIBDg/QAKgIAFgIQAGgIgBgKQAAgNgJgJQgJgIgPAAQgMAAgKAHQgJAHgEANIgXAAQAEgWAQgNQAOgNAYAAQAYAAAQANQAQAOAAAYQAAAYgZAWIg2AzIBSAAIAAAVg");
	this.shape_4.setTransform(-20.45,3.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgKA6IAAhfIgtAAIAAgUIBvAAIAAAUIgtAAIAABfg");
	this.shape_5.setTransform(-39.325,6.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgqArQgSgRAAgaQAAgZASgSQARgRAZAAQAaAAARARQASASAAAZQAAAagSARQgRASgaAAQgZAAgRgSgAgbgdQgLAMAAARQAAARALAMQALAMAQAAQARAAALgMQALgMAAgRQAAgRgLgMQgLgLgRAAQgQAAgLALg");
	this.shape_6.setTransform(-52.725,6.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#04E061").ss(2,1,1).p("AoxhyIRjAAQAwAAAiAiQAhAhAAAvQAAAwghAiQgiAhgwAAIxjAAQgvAAgighQgigiAAgwQAAgvAighQAigiAvAAg");
	this.shape_7.setTransform(-0.025,3.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAiA6IAAhTIhDBTIgWAAIAAhzIAWAAIAABTIBDhTIAWAAIAABzg");
	this.shape_8.setTransform(42.675,-20.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgKA6IAAhgIgtAAIAAgTIBvAAIAAATIgtAAIAABgg");
	this.shape_9.setTransform(29.025,-20.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgnAzQgNgKAAgTQAAgTAOgIQAOgJAXAAIAkAAQgBgaghAAQgLAAgIAEQgKAFgDAIIgYAAQAFgSAQgKQAPgJAUAAQAZAAAPAMQAPAMAAAVIAABJIgVAAIAAgNQgPAQgZAAQgVAAgNgKgAgfAWQAAATAcAAQARAAAKgIQALgIAAgOIAAgHIgkAAQgeAAAAASg");
	this.shape_10.setTransform(15.6,-20.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("Ag1A6IAAhzIBFAAQASAAAJAJQAKAIAAAPQAAARgPAIQAQAJAAARQAAAOgKAJQgJAJgSAAgAgfAnIAtAAQASAAAAgPQAAgOgSAAIgtAAgAgfgJIAsAAQASAAAAgOQAAgPgSAAIgsAAg");
	this.shape_11.setTransform(2.375,-20.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgqArQgSgRAAgaQAAgZASgSQARgRAZAAQAaAAARARQASASAAAZQAAAagSARQgRASgaAAQgZAAgRgSgAgbgdQgLAMAAARQAAARALAMQALAMAQAAQARAAALgMQALgMAAgRQAAgRgLgMQgLgLgRAAQgQAAgLALg");
	this.shape_12.setTransform(-12.325,-20.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("Ag7BVIAAimIAWAAIAAAMQAOgPAYAAQAcAAAPARQAQASAAAaQAAAYgQASQgPASgcAAQgYAAgOgQIAABAgAgag2QgMALAAAUQAAATAMAKQALALAPAAQARAAAKgMQALgLAAgRQAAgRgLgMQgKgMgRAAQgPAAgLAKg");
	this.shape_13.setTransform(-26.875,-18.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAjBUIhNhJIAABJIgXAAIAAinIAXAAIAABJIBNhJIAfAAIhZBTIBZBUg");
	this.shape_14.setTransform(-41.525,-23.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(75));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-100.1,-43,200.3,64.2);


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("ArPC3IAAltIWfAAIAAFtg");
	mask.setTransform(72,18.25);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00AAFF").s().p("AhDBEQgcgcAAgoQAAgnAcgcQAcgcAnAAQAoAAAcAcQAcAcAAAnQAAAogcAcQgcAcgoAAQgnAAgcgcg");
	this.shape.setTransform(29.5,9.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#965EEB").s().p("AgeAfQgNgMAAgTQAAgRANgNQAMgNASAAQASAAANANQANANAAARQAAATgNAMQgNANgSAAQgSAAgMgNg");
	this.shape_1.setTransform(14.075,6.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF4053").s().p("AgxAyQgVgVAAgdQAAgdAVgUQAVgVAcAAQAeAAAVAVQAUAUAAAdQAAAdgUAVQgVAVgeAAQgcAAgVgVg");
	this.shape_2.setTransform(32.275,27.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#04E061").s().p("AhTBTQgigiAAgxQAAgwAigiQAjgjAwAAQAxAAAjAjQAiAiAAAwQAAAxgiAiQgjAjgxAAQgwAAgjgjg");
	this.shape_3.setTransform(11.8,24.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgdByIAAjjIA7AAIAADjg");
	this.shape_4.setTransform(98.925,21.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgeAfQgNgNAAgSQAAgRANgNQANgNARAAQASAAANANQANANAAARQAAASgNANQgNANgSAAQgRAAgNgNg");
	this.shape_5.setTransform(98.925,4.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgSB+QgVgUAAgoIAAhfIgjAAIAAg2IAjAAIAAg9IA8AAIAAA9IA2AAIAAA2Ig2AAIAABSQAAAgAggBQAMAAAKgEIAAA5QgSAIgYAAQghAAgSgTg");
	this.shape_6.setTransform(111.875,18.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgeByIhXjjIBAAAIA1CPIA2iPIBAAAIhWDjg");
	this.shape_7.setTransform(82.175,21.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhTBUQgigjAAgxQAAgvAigkQAjgiAwAAQAxAAAjAiQAiAjAAAwQAAAxgiAjQgjAigxAAQgwAAgjgigAgognQgRARAAAWQAAAYARARQARARAXAAQAYAAARgRQAQgRAAgYQAAgWgQgRQgRgRgYAAQgXAAgRARg");
	this.shape_8.setTransform(132.175,21.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("ABcCiIgahEIiDAAIgZBEIhDAAIB8lDIBEAAIB7FDgAAsAjIgrhyIgrByIBWAAg");
	this.shape_9.setTransform(58.375,17.05);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0,0,144,36.5), null);


(lib.center = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AOGKuIhagBIgGAMIg4gGIgJgPI+Vi/IgLAMIgwgEIAAgOIhFgEIgChwIgkAAIgWBRQgFAVgZA2IgYhDQgWhWACgPQADgPBGifQANhNAVgmQAVgmA2hLIA5giQAWgMBggxIBcguQBZgjASgCIB6gLQAFAAAEgCQAJgEACgFQACgGgBgVIgBgVQAtgPAXgFQAPgEAhgBIAeAAQBVgiAagHQAQgEBJgLIBOgLIAygIIBAguIABjmIAWAAIAKgPQALgQAOgCQAOgCAHACIAGABIgBg8IDCABIB7AbQAEABBNgDIBNgEIDjAGIAegHICAAgIBhAGIAkgGIDiADIAQAFQASAGAMgBIA5gCIAPgMIBOgFIAogJQAJgCAHABQAKAagEAIQgEAFgKAhIgLAgICVgCIAELUIgdAZIACBDQAAANADAeIAPBKIghAKIgEACQgEAEgCAFQgDAHgSAKIgGAFQgHAHAAAIQAAAJgHAOQgIAPgHAFQgHAFgZADQgXADgJgCIg3gOIgugNIhQBbIAAAhIghAgIAWBUIhQBLIg6A+IgXADg");
	mask.setTransform(-0.0278,26.7011);

	// img
	this.instance = new lib.Bed();
	this.instance.setTransform(-147,-51,0.53,0.53);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75));

	// rounds
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#965EEB").s().p("AkXEYQh0h0AAikQAAijB0h0QB0h0CjAAQCkAAB0B0QB0B0AACjQAACkh0B0Qh0B0ikAAQijAAh0h0g");
	this.shape.setTransform(-5.75,-75.25,0.7,0.7,0,0,0,-0.6,1.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF4053").s().p("Ak2E3QiBiBAAi2QAAi1CBiBQCBiBC1AAQC2AACBCBQCBCBAAC1QAAC2iBCBQiBCBi2AAQi1AAiBiBg");
	this.shape_1.setTransform(53.4,66.85,0.9,0.9,0,0,0,-0.6,1.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00AAFF").s().p("AmfGgQitisAAj0QAAjzCtisQCsitDzAAQD0AACtCtQCsCsAADzQAAD0isCsQitCtj0AAQjzAAisitg");
	this.shape_2.setTransform(75.05,-35.5,1.0798,1.0798,0,0,0,-1.3,-0.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#04E061").s().p("Ao/JAQjvjuAAlSQAAlQDvjvQDujvFRAAQFRAADvDvQDvDvAAFQQAAFSjvDuQjvDvlRAAQlRAAjujvg");
	this.shape_3.setTransform(-58.5765,19.4692);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(75));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-146.3,-103.9,292.6,209.2);


// stage content:
(lib.Avito_BMMFurniture_Bed_240x400_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// border
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#DBDBDB").ss(1,1,1).p("EgXWguyMAutAAAMAAABdlMgutAAAg");
	this.shape.setTransform(119.9982,199.9783,0.8,0.6664);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(125));

	// avito_logo
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(120.15,360.65,0.72,0.72,0,0,0,72.3,18.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75).to({regY:18.5,scaleX:1.1199,scaleY:1.1199,x:120.1,y:200.15},0).wait(50));

	// legal
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AgGAnIAAgfIggAAIAAgPIAgAAIAAgfIAOAAIAAAfIAfAAIAAAPIgfAAIAAAfg");
	this.shape_1.setTransform(223.05,382.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AgmA9IAAgPIAwgtQAHgGADgFQAEgGAAgHQAAgKgHgFQgHgHgKAAQgIABgHAEQgHAFgCAJIgRAAQADgPALgKQALgJAQAAQARAAAMAKQALAKAAAQQAAASgSAPIgmAlIA6AAIAAAPg");
	this.shape_2.setTransform(212.975,381.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("AAFA8IAAhkIgZAXIAAgUIAYgWIARAAIAAB3g");
	this.shape_3.setTransform(204,381.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AgOAdQgHgFgCgHIAKAAQACAJALAAQAGAAAFgFQAEgDAAgHQAAgGgEgEQgFgCgGAAQgHgBgFAEIgJAAIADgjIAnAAIAAAIIgfAAIgCASQAHgDAGAAQAJAAAHAGQAHAFAAAKQAAAKgHAGQgHAHgKAAQgIAAgGgFg");
	this.shape_4.setTransform(76.95,384.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQADgEAAgDQAAgGgFgDQgEgEgFAAQgFAAgDADQgEADgBAFIgJAAQABgIAGgGQAGgFAJAAQAKAAAGAGQAGAFAAAJQAAAKgKAIIgVAUIAhAAIAAAJg");
	this.shape_5.setTransform(71.25,384.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#999999").s().p("AgFAGIAAgLIAKAAIAAALg");
	this.shape_6.setTransform(65,387.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgGQAAgFgHAAIgRAAg");
	this.shape_7.setTransform(61.225,385.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#999999").s().p("AAKAXIgWgTIAAATIgIAAIAAgtIAIAAIAAAUIAWgUIALAAIgZAWIAZAXg");
	this.shape_8.setTransform(56.1,385.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_9.setTransform(49.675,387.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999999").s().p("AACAhIAAg3IgMANIAAgLIAMgMIAJAAIAABBg");
	this.shape_10.setTransform(46.4,384.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#999999").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape_11.setTransform(41.3,387.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#999999").s().p("AAJAXIgUgTIAAATIgJAAIAAgtIAJAAIAAAUIAUgUIAMAAIgYAWIAYAXg");
	this.shape_12.setTransform(37.95,385.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_13.setTransform(31.525,387.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#999999").s().p("AAIAhIAAgOIgjAAIAAgIIAggrIAKAAIggArIAZAAIAAgTIAJAAIAAATIALAAIAAAIIgLAAIAAAOg");
	this.shape_14.setTransform(27.5,384.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_15.setTransform(22.3,384.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("AgFAGIAAgLIAKAAIAAALg");
	this.shape_16.setTransform(17.2,387.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#999999").s().p("AATAdIAAgMIglAAIAAAMIgJAAIAAgUIAFAAQAGgFAAgNIAAgTIAkAAIAAAlIAIAAIAAAUgAgHgJQAAAMgFAGIAXAAIAAgeIgSAAg");
	this.shape_17.setTransform(12.9,386.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_18.setTransform(164.225,376.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgHAGgEQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_19.setTransform(160.275,373.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgGQAAgFgHAAIgRAAg");
	this.shape_20.setTransform(155.025,373.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAHgGQAHgIAIABQALgBAFAIQAHAHAAAJIAAADIgkAAQABAGAEAEQAEADAFAAQAJABAEgHIAJAAQgDAGgGAFQgFADgIAAQgJABgHgIgAAOgDQgBgGgDgDQgEgEgGABQgEgBgFAEQgDADgBAGIAbAAIAAAAg");
	this.shape_21.setTransform(149.3,373.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgHAGgEQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_22.setTransform(143.625,373.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#999999").s().p("AATAdIAAgMIgmAAIAAAMIgIAAIAAgUIAGAAQAFgFAAgNIAAgTIAkAAIAAAlIAIAAIAAAUgAgIgJQAAAMgDAGIAWAAIAAgeIgTAAg");
	this.shape_23.setTransform(137.85,374.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgHAGgEQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_24.setTransform(131.975,373.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#999999").s().p("AgaAhIAAhBIAxAAIAAAIIgoAAIAAASIAVAAQALAAAGAGQAGAFAAAIQAAAJgGAGQgGAFgLAAgAgRAZIAVAAQAGAAAEgDQAEgDAAgGQAAgFgEgDQgEgDgGAAIgVAAg");
	this.shape_25.setTransform(126.275,372.925);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_26.setTransform(119.3,375.7);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#999999").s().p("AAPAXIAAglIgTAAIAAALIAAAHIgBAHQgBAEgCACQgBACgDACQgDACgFAAIgDAAIAAgIIACAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIADgFIABgFIAAgGIAAgTIAkAAIAAAtg");
	this.shape_27.setTransform(115.025,373.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#999999").s().p("AgOAhIgFAAIAAgHIADAAQAEAAACgCIAEgHIACgFIgUgsIAKAAIAOAhIAQghIAJAAIgWAvIgGAOQgDAEgGAAg");
	this.shape_28.setTransform(109.875,374.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_29.setTransform(103.725,376.275);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#999999").s().p("AgRAXIAAgtIAjAAIAAAIIgaAAIAAAlg");
	this.shape_30.setTransform(100.575,373.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#999999").s().p("AgXAiIAAhCIAJAAIAAAFQAGgGAIAAQALAAAGAHQAHAIAAAJQAAAJgHAIQgGAHgLAAQgIAAgGgGIAAAZgAgKgUQgEADAAAIQAAAJAEACQAFAFAFAAQAHAAAEgFQAEgEAAgHQAAgGgEgFQgEgFgHAAQgFAAgFAFg");
	this.shape_31.setTransform(95.175,374.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#999999").s().p("AgOAhIgFAAIAAgHIADAAQAEAAACgCIAEgHIACgFIgUgsIAKAAIAOAhIAQghIAJAAIgWAvIgGAOQgDAEgGAAg");
	this.shape_32.setTransform(89.425,374.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#999999").s().p("AgRAaQgGgHAAgNQAAgPAEgIQAFgJAMgBIAIgBQAHgBABgEIAJAAQgBAFgDAEQgEADgGABIgLABQgLABgBANQAFgHAJAAQALAAAGAHQAHAGAAAKQAAAJgHAHQgHAHgKAAQgLAAgGgIgAgKAAQgFAEABAHQgBAGAFAFQAEAEAGAAQAGAAAFgEQAEgFABgGQgBgHgEgEQgFgEgGAAQgGAAgEAEg");
	this.shape_33.setTransform(83.95,372.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#999999").s().p("AgXAiIAAhCIAJAAIAAAFQAGgGAIAAQALAAAGAHQAHAIAAAJQAAAJgHAIQgGAHgLAAQgIAAgGgGIAAAZgAgKgUQgEADAAAIQAAAJAEACQAFAFAFAAQAHAAAEgFQAEgEAAgHQAAgGgEgFQgEgFgHAAQgFAAgFAFg");
	this.shape_34.setTransform(78.125,374.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAGgGQAHgIAJABQALgBAFAIQAHAHAAAJIAAADIgkAAQAAAGAFAEQAEADAFAAQAIABAFgHIAJAAQgDAGgFAFQgHADgHAAQgKABgGgIgAAOgDQgBgGgDgDQgEgEgGABQgFgBgEAEQgDADgBAGIAbAAIAAAAg");
	this.shape_35.setTransform(72.15,373.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgRAAIAAAlg");
	this.shape_36.setTransform(66.95,373.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAHgGQAGgIAKABQAJgBAGAIQAHAHAAAJIAAADIgkAAQABAGAEAEQAEADAFAAQAJABADgHIAJAAQgCAGgGAFQgFADgIAAQgKABgGgIgAAOgDQgBgGgDgDQgEgEgFABQgGgBgDAEQgEADgBAGIAbAAIAAAAg");
	this.shape_37.setTransform(61.75,373.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_38.setTransform(55.325,372.925);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#999999").s().p("AgMAEIAAgHIAZAAIAAAHg");
	this.shape_39.setTransform(49.7,373.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgSAAIAAAlg");
	this.shape_40.setTransform(45.3,373.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#999999").s().p("AAKAXIgWgTIAAATIgIAAIAAgtIAIAAIAAAUIAWgUIALAAIgZAWIAZAXg");
	this.shape_41.setTransform(40.7,373.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#999999").s().p("AAOAXIAAgTIgaAAIAAATIgJAAIAAgtIAJAAIAAATIAaAAIAAgTIAIAAIAAAtg");
	this.shape_42.setTransform(34.8,373.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgHAGgEQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_43.setTransform(28.925,373.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#999999").s().p("AgUAYQgLgKABgOQgBgOALgKQAJgKAOABQAJgBAIAFQAHAFAFAIIgKAAQgIgKgLAAQgKAAgHAIQgIAHABALQgBALAIAHQAHAIAKAAQALAAAIgKIAKAAQgFAJgHAFQgIAEgJAAQgOABgJgLg");
	this.shape_44.setTransform(22.75,372.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_45.setTransform(15.7,375.7);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#999999").s().p("AgRAXIAAgtIAjAAIAAAIIgaAAIAAAlg");
	this.shape_46.setTransform(12.475,373.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_47.setTransform(174.875,364.575);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#999999").s().p("AgRAdQgHgGABgJQgBgJAKgFQgJgGAAgJQAAgHAGgGQAHgGAKABQALgBAGAGQAGAGABAHQAAAJgJAGQAJAFAAAJQABAJgIAGQgGAFgLAAQgKAAgHgFgAgLAGQgDAEAAAEQgBAFAFAEQAEADAGAAQAGAAAFgDQAEgEAAgFQAAgEgEgEQgEgDgHAAQgGAAgFADgAgKgWQgEADAAAEQAAAFAEADQAEADAGAAQAGAAAEgDQAFgDAAgFQAAgEgFgDQgEgDgGgBQgGABgEADg");
	this.shape_48.setTransform(170.8,361.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#999999").s().p("AACAhIAAg3IgMANIAAgLIAMgMIAJAAIAABBg");
	this.shape_49.setTransform(165.55,361.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGgBQgKAAgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_50.setTransform(160.925,361.25);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGgBQgKAAgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_51.setTransform(155.175,361.25);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#999999").s().p("AgXATIAJAAQAEAHAJAAQAHAAAFgGQAEgHABgLQgDADgFACQgEACgFAAQgJAAgHgGQgHgFAAgKQAAgJAHgGQAHgHAKABQALAAAHAHQAHAJAAAQQAAAGgCAHQgBAGgDAFQgDAFgGADQgFAEgGgBQgQAAgGgPgAgKgVQgFADAAAGQAAAGAFAEQAEACAGAAQAGAAAEgCQAEgEAAgGQAAgGgEgDQgEgEgGgBQgGABgEAEg");
	this.shape_52.setTransform(149.375,361.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#999999").s().p("AACAhIAAg3IgNANIAAgLIANgMIAJAAIAABBg");
	this.shape_53.setTransform(144.2,361.225);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_54.setTransform(139.025,364.575);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#999999").s().p("AgOAdQgHgFgCgHIAKAAQACAJALAAQAGAAAFgFQAEgDAAgHQAAgGgEgEQgFgCgGAAQgHgBgFAEIgJAAIADgjIAnAAIAAAIIgfAAIgCASQAHgDAGAAQAJAAAHAGQAHAFAAAKQAAAKgHAGQgHAHgKAAQgIAAgGgFg");
	this.shape_55.setTransform(135,361.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGgBQgKAAgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_56.setTransform(129.175,361.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#999999").s().p("AgRAdQgGgGAAgJQAAgJAJgFQgJgGAAgJQAAgHAHgGQAGgGAKABQALgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgGAGQgHAFgLAAQgKAAgHgFgAgLAGQgDAEAAAEQAAAFAEAEQAFADAFAAQAHAAAEgDQAFgEgBgFQABgEgFgEQgEgDgHAAQgGAAgFADgAgKgWQgEADAAAEQAAAFAEADQAEADAGAAQAGAAAFgDQADgDAAgFQAAgEgDgDQgFgDgGgBQgFABgFADg");
	this.shape_57.setTransform(123.4,361.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#999999").s().p("AgRAaQgHgIAAgRQAAgGACgGQABgGADgFQAEgGAFgCQAFgDAGAAQAQAAAGAPIgJAAQgEgIgJAAQgGAAgFAHQgGAGAAAMQADgEAFgBQAEgDAFAAQAJABAHAFQAHAGAAAKQAAAIgHAHQgHAGgKAAQgLAAgHgIgAgJADQgEADAAAHQAAAFAEAEQAEAEAFAAQAHAAAEgEQAFgEAAgFQAAgHgFgDQgEgDgHAAQgFAAgEADg");
	this.shape_58.setTransform(117.425,361.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#999999").s().p("AAIAhIAAgOIgjAAIAAgIIAggrIAKAAIggArIAZAAIAAgTIAJAAIAAATIALAAIAAAIIgLAAIAAAOg");
	this.shape_59.setTransform(111.4,361.225);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_60.setTransform(106.2,361.225);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#999999").s().p("AgJAgQgFgDgCgDIgGgIIgCgKIAAgIIAAgIIACgJQADgFADgEQACgDAFgCQAEgCAFAAQAGAAAEACQAEACAEADQADAEABAFIACAJIACAIIgCAIIgCAKQgBAFgDADQgEADgEADQgEADgGgBQgFABgEgDgAgHgXQgDACgCAEQgCAFAAAEIgBAIIABAIQAAAFACAEQACAEADADQAEACADAAQAFAAADgCQADgDACgEIACgJIACgIIgCgIIgCgJQgCgEgDgCQgDgDgFAAQgDAAgEADg");
	this.shape_61.setTransform(101.45,361.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#999999").s().p("AgKAgQgEgDgDgDIgEgIIgDgKIgBgIIABgIIADgJQABgFADgEQADgDAEgCQAFgCAFAAQAGAAAEACQAEACADADQADAEACAFIADAJIAAAIIAAAIIgDAKQgCAFgDADQgDADgEADQgEADgGgBQgFABgFgDgAgHgXQgDACgCAEQgCAFAAAEIgCAIIACAIQAAAFACAEQACAEADADQADACAEAAQAEAAADgCQAEgDACgEIACgJIABgIIgBgIIgCgJQgCgEgEgCQgDgDgEAAQgEAAgDADg");
	this.shape_62.setTransform(95.2,361.25);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#999999").s().p("AgSAhIAfg5IgiAAIAAgIIAsAAIAAAIIgfA5g");
	this.shape_63.setTransform(89.45,361.225);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#999999").s().p("AAIAhIAAgOIgjAAIAAgIIAfgrIALAAIgfArIAYAAIAAgTIAJAAIAAATIALAAIAAAIIgLAAIAAAOg");
	this.shape_64.setTransform(83.8,361.225);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#999999").s().p("AgRAdQgGgGgBgJQAAgJAKgFQgJgGAAgJQAAgHAGgGQAHgGAKABQALgBAGAGQAHAGAAAHQAAAJgJAGQAKAFAAAJQgBAJgGAGQgHAFgLAAQgKAAgHgFgAgKAGQgFAEAAAEQABAFAEAEQAFADAFAAQAGAAAFgDQAFgEAAgFQAAgEgFgEQgEgDgHAAQgGAAgEADgAgJgWQgFADAAAEQAAAFAEADQAEADAGAAQAHAAADgDQAEgDABgFQgBgEgEgDQgDgDgHgBQgFABgEADg");
	this.shape_65.setTransform(77.8,361.25);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#999999").s().p("AgSAhIAfg5IgiAAIAAgIIAsAAIAAAIIgfA5g");
	this.shape_66.setTransform(72.15,361.225);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_67.setTransform(67.25,361.225);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQADgEgBgDQAAgGgDgDQgFgEgFAAQgFAAgDADQgEADgBAFIgKAAQACgIAHgGQAFgFAJAAQAJAAAHAGQAGAFAAAJQAAAKgKAIIgVAUIAgAAIAAAJg");
	this.shape_68.setTransform(62.75,361.175);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGgBQgKAAgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_69.setTransform(56.975,361.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_70.setTransform(48.275,361.225);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#999999").s().p("AAUAhIAAg1IgmA1IgKAAIAAhBIAJAAIAAA1IAmg1IAKAAIAABBg");
	this.shape_71.setTransform(40.925,361.225);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#999999").s().p("AATAhIAAgdIgmAAIAAAdIgJAAIAAhBIAJAAIAAAdIAmAAIAAgdIAJAAIAABBg");
	this.shape_72.setTransform(33.55,361.225);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#999999").s().p("AgaAhIAAhBIAgAAQAJAAAGAFQAGAFAAAJQAAAKgGAEQgGAFgJAAIgXAAIAAAbgAgRgCIAXAAQAFAAADgCQAEgDAAgGQAAgFgEgDQgDgDgFAAIgXAAg");
	this.shape_73.setTransform(26.775,361.225);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#999999").s().p("AgWAhIAAhBIAtAAIAAAIIgkAAIAAA5g");
	this.shape_74.setTransform(20.725,361.225);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#999999").s().p("AgXAYQgKgKAAgOQAAgOAKgKQAKgKANABQAOgBAKAKQAKAKAAAOQAAAOgKAKQgKALgOgBQgNABgKgLgAgRgSQgHAHAAALQAAALAHAHQAHAIAKAAQALAAAHgIQAHgHAAgLQAAgLgHgHQgHgIgLAAQgKAAgHAIg");
	this.shape_75.setTransform(13.75,361.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_76.setTransform(227.475,352.875);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#999999").s().p("AgEAGIAAgLIAKAAIAAALg");
	this.shape_77.setTransform(225.25,352.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#999999").s().p("AAOAhIgegcIAAAcIgJAAIAAhBIAJAAIAAAdIAegdIAMAAIgiAgIAiAhg");
	this.shape_78.setTransform(221.45,349.525);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_79.setTransform(216.85,352.3);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#999999").s().p("AAeAhIAAgyIgZAyIgJAAIgZgyIAAAyIgJAAIAAhBIALAAIAbA4IAcg4IALAAIAABBg");
	this.shape_80.setTransform(210.925,349.525);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgGQAAgFgHAAIgRAAg");
	this.shape_81.setTransform(201.225,350.55);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAHgGQAGgIAKABQAKgBAGAIQAGAHAAAJIAAADIgkAAQABAGAEAEQAEADAFAAQAJABADgHIAJAAQgCAGgGAFQgFADgIAAQgJABgHgIgAAOgDQAAgGgEgDQgEgEgFABQgGgBgDAEQgEADgBAGIAbAAIAAAAg");
	this.shape_82.setTransform(195.5,350.55);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#999999").s().p("AgXAiIAAhCIAJAAIAAAFQAGgGAIAAQALAAAGAHQAHAIAAAJQAAAJgHAIQgGAHgLAAQgIAAgGgGIAAAZgAgKgUQgEADAAAIQAAAJAEACQAFAFAFAAQAHAAAEgFQAEgEAAgHQAAgGgEgFQgEgFgHAAQgFAAgFAFg");
	this.shape_83.setTransform(189.875,351.5);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgGAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_84.setTransform(183.825,350.55);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#999999").s().p("AAJAXIgVgTIAAATIgIAAIAAgtIAIAAIAAAUIAVgUIAMAAIgYAWIAYAXg");
	this.shape_85.setTransform(179,350.55);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAHgGQAHgIAJABQAIAAAGADQAFAFADAGIgJAAQgEgGgJAAQgFAAgFAEQgEAFAAAGQAAAHAEAFQAFAEAFAAQAJAAAEgGIAJAAQgDAGgFAFQgGADgIAAQgJABgHgIg");
	this.shape_86.setTransform(173.375,350.55);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#999999").s().p("AANAXIAAghIgaAhIgIAAIAAgtIAIAAIAAAhIAaghIAJAAIAAAtg");
	this.shape_87.setTransform(167.6,350.55);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_88.setTransform(160.975,349.525);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_89.setTransform(151.425,349.525);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#999999").s().p("AAUAhIAAg1IgmA1IgKAAIAAhBIAJAAIAAA1IAmg1IAKAAIAABBg");
	this.shape_90.setTransform(144.075,349.525);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgSAAIAAAlg");
	this.shape_91.setTransform(135.65,350.55);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#999999").s().p("AgQARQgHgGAAgLQAAgKAHgGQAHgIAJABQAKgBAIAIQAGAGAAAKQAAALgGAGQgIAIgKgBQgJABgHgIgAgKgLQgEAFgBAGQABAHAEAFQAEAEAGAAQAHAAAEgEQAFgFAAgHQAAgGgFgFQgEgEgHAAQgGAAgEAEg");
	this.shape_92.setTransform(130.35,350.55);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#999999").s().p("AgQARQgHgGAAgLQAAgKAHgGQAHgIAJABQAKgBAIAIQAGAGAAAKQAAALgGAGQgIAIgKgBQgJABgHgIgAgKgLQgEAFgBAGQABAHAEAFQAEAEAGAAQAHAAAEgEQAFgFAAgHQAAgGgFgFQgEgEgHAAQgGAAgEAEg");
	this.shape_93.setTransform(122.25,350.55);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgSAAIAAAlg");
	this.shape_94.setTransform(116.95,350.55);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#999999").s().p("AANAXIAAghIgaAhIgIAAIAAgtIAIAAIAAAhIAaghIAJAAIAAAtg");
	this.shape_95.setTransform(111.55,350.55);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgGQAAgFgHAAIgRAAg");
	this.shape_96.setTransform(105.925,350.55);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#999999").s().p("AAZAhIgHgPIgjAAIgHAPIgJAAIAdhBIAJAAIAdBBgAAOAKIgOggIgNAgIAbAAg");
	this.shape_97.setTransform(99.6,349.525);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgGAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_98.setTransform(91.025,350.55);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#999999").s().p("AAOAXIAAgTIgaAAIAAATIgJAAIAAgtIAJAAIAAATIAaAAIAAgTIAIAAIAAAtg");
	this.shape_99.setTransform(85.4,350.55);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#999999").s().p("AANAXIgNgRIgNARIgKAAIATgXIgTgWIALAAIAMARIANgRIALAAIgTAWIATAXg");
	this.shape_100.setTransform(77.5,350.55);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#999999").s().p("AANAXIAAgPIgLAAIgMAPIgLAAIAOgQQgGgBgDgEQgCgEAAgEQAAgHAEgFQAFgEAIAAIAXAAIAAAtgAgHgNQgDACAAAFQAAADADACQACABAEAAIAOAAIAAgOIgOAAQgEAAgCABg");
	this.shape_101.setTransform(71.975,350.55);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#999999").s().p("AANAXIAAghIgZAhIgJAAIAAgtIAJAAIAAAhIAZghIAJAAIAAAtg");
	this.shape_102.setTransform(66.6,350.55);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#999999").s().p("AANAXIAAgTIgaAAIAAATIgIAAIAAgtIAIAAIAAATIAaAAIAAgTIAJAAIAAAtg");
	this.shape_103.setTransform(60.6,350.55);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAHgGQAHgIAIABQALgBAFAIQAHAHAAAJIAAADIgkAAQABAGAEAEQAEADAFAAQAJABAEgHIAJAAQgDAGgFAFQgGADgIAAQgJABgHgIgAAOgDQgBgGgDgDQgEgEgGABQgEgBgFAEQgDADgBAGIAbAAIAAAAg");
	this.shape_104.setTransform(54.8,350.55);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#999999").s().p("AAPAXIAAglIgTAAIAAALIAAAHIgBAHQgBAEgCACQgBACgDACQgDACgFAAIgDAAIAAgIIACAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIADgFIABgFIAAgGIAAgTIAkAAIAAAtg");
	this.shape_105.setTransform(48.875,350.55);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgGQAAgFgHAAIgRAAg");
	this.shape_106.setTransform(43.675,350.55);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#999999").s().p("AANAXIAAgPIgLAAIgMAPIgLAAIAOgQQgGgBgDgEQgCgEAAgEQAAgHAEgFQAFgEAIAAIAXAAIAAAtgAgHgNQgDACAAAFQAAADADACQACABAEAAIAOAAIAAgOIgOAAQgEAAgCABg");
	this.shape_107.setTransform(37.825,350.55);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#999999").s().p("AgNAXIAAglIgOAAIAAgIIAXAAIAAAPIAPAAQAIAAAFAEQAEAEAAAGQAAAHgEAFQgFAEgIAAgAgEAPIAPAAQAEAAACgCQADgBAAgFQAAgDgDgCQgCgCgEAAIgPAAg");
	this.shape_108.setTransform(32.375,350.55);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#999999").s().p("AgRAaQgGgHAAgNQAAgPAEgIQAFgJALgBIAJgBQAHgBABgEIAIAAQAAAFgDAEQgEADgGABIgLABQgLABgBANQAFgHAKAAQAJAAAHAHQAHAGAAAKQAAAJgHAHQgHAHgKAAQgLAAgGgIgAgKAAQgFAEABAHQgBAGAFAFQAFAEAFAAQAGAAAFgEQAFgFgBgGQABgHgFgEQgFgEgGAAQgFAAgFAEg");
	this.shape_109.setTransform(26.55,349.575);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#999999").s().p("AgQARQgHgGAAgLQAAgKAHgGQAHgIAJABQAKgBAIAIQAGAGAAAKQAAALgGAGQgIAIgKgBQgJABgHgIgAgKgLQgEAFgBAGQABAHAEAFQAFAEAFAAQAHAAAEgEQAFgFAAgHQAAgGgFgFQgEgEgHAAQgFAAgFAEg");
	this.shape_110.setTransform(20.65,350.55);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgGQAAgFgHAAIgRAAg");
	this.shape_111.setTransform(12.825,350.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#999999").s().p("AgEAGIAAgLIAKAAIAAALg");
	this.shape_112.setTransform(208.25,340.6);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#999999").s().p("AgRAXIAAgtIAjAAIAAAIIgaAAIAAAlg");
	this.shape_113.setTransform(205.025,338.85);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGgBQgKAAgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_114.setTransform(197.175,337.85);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQACgEAAgDQAAgGgDgDQgEgEgGAAQgEAAgEADQgEADgBAFIgKAAQACgIAGgGQAHgFAIAAQAKAAAGAGQAGAFAAAJQAAAKgKAIIgVAUIAgAAIAAAJg");
	this.shape_115.setTransform(191.55,337.775);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#999999").s().p("AgKAgQgEgDgDgDIgEgIIgDgKIgBgIIABgIIADgJQABgFADgEQADgDAEgCQAFgCAFAAQAGAAAEACQAEACADADQADAEACAFIACAJIABAIIgBAIIgCAKQgCAFgDADQgDADgEADQgEADgGgBQgFABgFgDgAgHgXQgDACgCAEQgCAFAAAEIgCAIIACAIQAAAFACAEQACAEADACQADADAEAAQAEAAADgDQAEgCACgEIACgJIABgIIgBgIIgCgJQgCgEgEgCQgDgDgEAAQgEAAgDADg");
	this.shape_116.setTransform(185.65,337.85);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQADgEgBgDQAAgGgDgDQgEgEgGAAQgEAAgEADQgEADgBAFIgJAAQABgIAHgGQAFgFAJAAQAJAAAHAGQAGAFAAAJQAAAKgKAIIgVAUIAgAAIAAAJg");
	this.shape_117.setTransform(179.65,337.775);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#999999").s().p("AgFAGIAAgLIAKAAIAAALg");
	this.shape_118.setTransform(175.7,340.6);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#999999").s().p("AgKAgQgEgDgCgDIgGgIIgCgKIAAgIIAAgIIACgJQACgFAEgEQACgDAEgCQAFgCAFAAQAFAAAFACQAEACADADQAEAEABAFIACAJIABAIIgBAIIgCAKQgBAFgEADQgDADgEADQgFADgFgBQgFABgFgDgAgHgXQgDACgCAEQgCAFAAAEIgBAIIABAIQAAAFACAEQACAEADACQADADAEAAQAEAAADgDQAEgCACgEIACgJIABgIIgBgIIgCgJQgCgEgEgCQgDgDgEAAQgEAAgDADg");
	this.shape_119.setTransform(171.45,337.85);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#999999").s().p("AACAhIAAg3IgMANIAAgLIAMgMIAJAAIAABBg");
	this.shape_120.setTransform(166.1,337.825);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_121.setTransform(163.3,340.6);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#999999").s().p("AgRAdQgGgGgBgJQAAgJAKgFQgJgGAAgJQAAgHAHgGQAGgGAKABQALgBAGAGQAHAGgBAHQABAJgJAGQAKAFAAAJQgBAJgGAGQgHAFgLAAQgKAAgHgFgAgKAGQgFAEAAAEQABAFAEAEQAEADAGAAQAGAAAFgDQAFgEAAgFQAAgEgFgEQgEgDgHAAQgGAAgEADgAgJgWQgFADAAAEQAAAFAEADQAEADAGAAQAHAAADgDQAEgDAAgFQAAgEgEgDQgDgDgHgBQgFABgEADg");
	this.shape_122.setTransform(159.15,337.85);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_123.setTransform(153.9,337.825);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#999999").s().p("AgQARQgHgGAAgLQAAgKAHgGQAGgIAKABQALgBAGAIQAHAGAAAKQAAALgHAGQgGAIgLgBQgKABgGgIgAgKgLQgFAFABAGQgBAHAFAFQAEAEAGAAQAHAAAEgEQAEgFAAgHQAAgGgEgFQgEgEgHAAQgGAAgEAEg");
	this.shape_124.setTransform(147.05,338.85);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#999999").s().p("AATAdIAAgMIglAAIAAAMIgJAAIAAgUIAGAAQAFgFAAgNIAAgTIAkAAIAAAlIAIAAIAAAUgAgIgJQAAAMgDAGIAWAAIAAgeIgTAAg");
	this.shape_125.setTransform(141,339.475);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgSAAIAAAlg");
	this.shape_126.setTransform(133.3,338.85);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#999999").s().p("AgGATQgGgGgBgJIgKAAIAAATIgIAAIAAgtIAIAAIAAATIAKAAQABgJAHgGQAFgFAJAAQAKgBAGAIQAIAGAAAKQAAALgIAGQgGAIgKgBQgJAAgGgFgAgBgLQgEAFAAAGQAAAHAEAFQADAEAHAAQAGAAAEgEQAFgFAAgHQAAgGgFgFQgEgEgGAAQgHAAgDAEg");
	this.shape_127.setTransform(127.15,338.85);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#999999").s().p("AgOAhIgFAAIAAgHIADAAQAEAAACgCIAEgHIACgFIgUgsIAKAAIAOAhIAQghIAJAAIgWAvIgGAOQgDAEgGAAg");
	this.shape_128.setTransform(120.525,339.875);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgGQAAgFgHAAIgRAAg");
	this.shape_129.setTransform(115.275,338.85);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgRAAIAAAlg");
	this.shape_130.setTransform(109.95,338.85);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAHgGQAHgIAJABQAIAAAGADQAFAFADAGIgJAAQgEgGgJAAQgFAAgFAEQgEAFAAAGQAAAHAEAFQAFAEAFAAQAJAAAEgGIAJAAQgDAGgFAFQgGADgIAAQgJABgHgIg");
	this.shape_131.setTransform(104.825,338.85);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#999999").s().p("AAOAjIAAgiIgaAiIgJAAIAAgtIAJAAIAAAgIAaggIAIAAIAAAtgAgLgWQgGgFAAgHIAIAAQAAAEADADQACADAEAAQAEAAADgDQADgDAAgEIAIAAQAAAHgGAFQgFAFgHAAQgHAAgEgFg");
	this.shape_132.setTransform(99.05,337.675);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAHgGQAGgIAKABQAJgBAGAIQAHAHAAAJIAAADIgkAAQABAGAEAEQAEADAFAAQAJABADgHIAJAAQgCAGgGAFQgFADgIAAQgKABgGgIgAAOgEQgBgFgDgDQgEgEgFABQgGgBgDAEQgEADgBAFIAbAAIAAAAg");
	this.shape_133.setTransform(93.25,338.85);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#999999").s().p("AATAdIAAgMIgmAAIAAAMIgIAAIAAgUIAFAAQAGgFAAgNIAAgTIAlAAIAAAlIAHAAIAAAUgAgHgJQgBAMgEAGIAYAAIAAgeIgTAAg");
	this.shape_134.setTransform(87.3,339.475);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#999999").s().p("AATAXIAAgtIAJAAIAAAtgAgbAXIAAgtIAIAAIAAAPIAOAAQAIAAAEAEQAFAEAAAGQAAAHgFAFQgEAEgIAAgAgTAPIAOAAQAEAAACgCQACgBAAgFQAAgDgCgCQgCgCgEAAIgOAAg");
	this.shape_135.setTransform(78.425,338.85);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#999999").s().p("AAOAXIAAgTIgaAAIAAATIgJAAIAAgtIAJAAIAAATIAaAAIAAgTIAIAAIAAAtg");
	this.shape_136.setTransform(71.8,338.85);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAGgGQAIgIAJABQAJgBAHAIQAGAHAAAJIAAADIgkAAQABAGAEAEQAEADAFAAQAJABADgHIAJAAQgCAGgGAFQgFADgIAAQgJABgHgIgAAOgEQAAgFgEgDQgEgEgFABQgGgBgDAEQgEADgBAFIAbAAIAAAAg");
	this.shape_137.setTransform(66,338.85);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#999999").s().p("AAXApIAAgPIg2AAIAAhBIAJAAIAAA4IAkAAIAAg4IAJAAIAAA4IAJAAIAAAYg");
	this.shape_138.setTransform(59.675,338.55);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#999999").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape_139.setTransform(52.2,340.6);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgHAGgEQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_140.setTransform(48.175,338.85);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#999999").s().p("AATAXIAAgdIgPAdIgHAAIgPgdIAAAdIgJAAIAAgtIAKAAIARAkIASgkIAKAAIAAAtg");
	this.shape_141.setTransform(41.975,338.85);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#999999").s().p("AgPAVQgFgFAAgHQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCADIgJAAQACgHAGgEQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAGgJAAQgJAAgFgDgAgMAJQAAAIALgBQAGABAEgEQAFgDAAgGIAAgCIgOAAQgMgBAAAIg");
	this.shape_142.setTransform(35.525,338.85);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#999999").s().p("AAPAXIAAglIgTAAIAAALIAAAHIgBAHQgBAEgCACQgBACgDACQgDACgFAAIgDAAIAAgIIACAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIADgFIABgFIAAgGIAAgTIAkAAIAAAtg");
	this.shape_143.setTransform(29.775,338.85);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#999999").s().p("AAJAXIgUgTIAAATIgJAAIAAgtIAJAAIAAAUIAUgUIAMAAIgYAWIAYAXg");
	this.shape_144.setTransform(25,338.85);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#999999").s().p("AgPARQgHgGAAgLQAAgKAGgGQAIgIAJABQAJgBAHAIQAGAHAAAJIAAADIgkAAQABAGAEAEQAEADAFAAQAIABAEgHIAJAAQgCAGgFAFQgHADgHAAQgKABgGgIgAAOgEQAAgFgEgDQgEgEgFABQgFgBgEAEQgEADgBAFIAbAAIAAAAg");
	this.shape_145.setTransform(19.3,338.85);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#999999").s().p("AgaAhIAAhBIAgAAQAJAAAGAFQAGAFAAAJQAAAKgGAEQgGAFgJAAIgXAAIAAAbgAgRgCIAXAAQAFAAADgCQAEgDAAgGQAAgFgEgDQgDgDgFAAIgXAAg");
	this.shape_146.setTransform(13.425,337.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},75).wait(50));

	// center
	this.instance_1 = new lib.center();
	this.instance_1.setTransform(119.95,240.05,0.72,0.72,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},75).wait(50));

	// logo
	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AEUBEIgDgCQgEgDABgEQgBgFAEgDIADgCIADgBIAEABIADACQADADAAAFQAAAEgDADIgDACIgEABgAgZBFIgHgCIAFgNIAEACIAFACQADAAADgCIAEgDIAvh4IALAAIA6CGIgTAAIgxhxIgBAAIglBfQgCAIgGAHIgFAEIgGABgAoRBFIg8hwIAAAAIAABuIgJAAIAAiHIANAAIA+BzIABAAIA/hzIANAAIAACHIgRAAIAAhtIgBAAIg9BvgAIFBDIAAgRIgCAAQgRAAgNgGQgLgFgIgHQgGgHgEgKQgDgIAAgHQAAgLAEgJQAEgJAHgIQAHgIALgDQAMgFANAAIAGAAIAAgPIASAAIAAAPIAHAAQAMAAAMAFQAKADAIAIQAPAPAAAWQAAAHgDAIQgDAKgHAHQgIAHgLAFQgNAGgQAAIgDAAIAAARgAIXAqIABAAQAHAAALgDQAJgEAFgGQAGgFADgIQADgJAAgHQAAgIgCgJQgCgGgGgHQgFgHgIgDQgIgFgMAAIgCAAgAHvgoQgIADgFAHQgGAGgCAIQgCAIAAAIQAAAHADAJQACAGAHAHQAFAGAJAEQALADAHAAIABAAIAAhXIgCAAQgMAAgIAFgAFPBDIAAiHIAtAAQALAAAJAEQAIADAGAGQAGAFACAHQADAIAAAIQAAAJgEAHQgDAIgGAEQgGAGgJADQgKAEgLAAIgXgEIAAA5gAFhACIAJADIALAAQAHAAAIgDQAGgCAEgEQAEgFACgGQACgHAAgFQAAgEgCgHQgDgGgEgFQgDgEgHgDQgGgDgIgBIgUAAgACOBDIAAiHIASAAIAAA7IAeAAQALAAAKADQAIADAHAFQAGAFACAHQADAGAAAGQAAAHgCAIQgEAIgEAEQgHAHgIADQgLAEgNAAgACgA7IAcAAQAGAAAGgDQAGgCAEgEQADgEADgGQACgGAAgFQAAgGgCgGQgDgGgEgDQgEgEgHgDQgFgBgIAAIgZAAgAiIBDIAAiHIBXAAIAAALIhGAAIAAAwIA8AAIAAAJIg8AAIAAA4IBGAAIAAALgAkQBDIAAiHIBTAAIAAALIhBAAIAAAwIAbAAQAQABAJADQAJACAGAFQAFAFADAIQACAHAAAGQAAAGgCAIQgDAIgFAEQgGAGgJADQgMAEgNAAgAj+A6IAbABIALgDQAHgCADgDQAFgEACgFQADgGAAgHQAAgFgCgHQgCgFgFgEQgFgFgFgCQgGgBgIAAIgZAAgAmKBDIAAiHIBYAAIAAALIhGAAIAAAwIA8AAIAAAJIg8AAIAAA4IBGAAIAAALg");
	this.shape_147.setTransform(145.3455,39.4809,0.72,0.72);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#C83D38").s().p("AgvB0QgEAAgCgBQgCgCAAgEIAAhnIACgFIAMgLQAKgHAJgEQAMgGAOgCIAGAAQATABANAUQASAbgFAnQgDAWgMAQQgNAUgaAAgAg3hrQAAgFACgBQACgCAEAAIAmAAQAXACAFAXQAGAZgKAVQgCAFgEADIgDABQgPACgPAHQgMAFgIAHIgLAJg");
	this.shape_148.setTransform(64.5319,38.4549,0.72,0.72);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AhfCPQgYgEgVgJQgXgKgRgOQgWgUgEgWIgBgLIABiZQABgOgFgRIgGgMIBXABQAYABAOAMQAQANgBATQgBATgRAMIgMAIQAaADATAVQANAPAFATQAMArglAhQgVASgdAAIhCAAIAIAHQAPAOAYAKQAVAIAWAEQAXAEAXgDIAFAAIARgDIAWgHQAUgJATgMQAZgRAVgVIgthUQgZgvgbg6IAACtQAAAOACAJIACAHQACAGADAEIgVAAQAHgMABgRIABgfIAAhOQAAgpgCgiIgCgLIgFgMQAOgDAKAFQAJAFAEALIBZCwIAEgGQAPgRANgTQAMgRAKgWQAKgUAHgXQAIgaABgQIAAgTQAAgHADgBIAFgBIAfAAQgHANgCANQgBAJAAAuIABB4QABASAEALIADAGIgtAAQAJgMAAgaIAAiPIgFARQgGAUgLAYQgLAWgMARQgMASgQAUIgGAHIASAlIgOAAQgKAAgDgCIgIgRQgUAUgaARQgVAOgTAIIgiAJIgMACIgPAAQgPAAgRgCgAiTguQgJAEgKAHIgMAMIgCAFIAABmQAAAEACACQACABAEAAIAxAAQAaAAANgUQAMgQADgWQAFgmgSgcQgNgUgTgBIgGAAQgPACgMAGgAiyiKQgCABAAAFIAABmIALgJQAIgHAMgFQAPgHAQgCIADgBQAEgDACgFQAKgVgGgZQgFgXgYgCIgmAAQgEAAgCACg");
	this.shape_149.setTransform(73.5284,40.2716,0.72,0.72);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#D92C2F").s().p("AhfEkIgbgKQg0gWgqgqQhahaAAiAQAAh+BahaQBahaB+AAQB/AABaBaQBaBaAAB+QAACAhaBaQgrAqgzAWIgbAKQgtAPgzAAQgzAAgsgPgAjThnQAGARgBAOIgBCaIABALQAEAWAWATQARAPAXAJQAVAJAYAEQAZAEAWgCIAMgBIAhgKQAUgIAVgOQAagQAUgVIAIARQADADAKgBIAOAAIgSglIAGgHQAQgTAMgTQALgRAMgXQALgXAGgTIAFgSIAACPQAAAagJAMIAtAAIgDgGQgEgLgBgSIgBh4QAAguABgIQABgOAIgNIggAAIgEABQgDACAAAGIAAATQgBARgJAaQgGAWgKAUQgKAVgNASQgMAUgPARIgEAFIhZiwQgEgLgKgFQgJgFgPAEIAGALIABALQACAiAAApIAABPIAAAeQgBASgIALIAWAAQgDgEgCgGIgCgHQgDgJABgOIAAitQAaA6AaAuIAtBWQgVAUgZARQgTAMgVAJIgVAHIgRADIgGAAQgWADgXgEQgWgEgWgIQgXgKgQgOIgHgHIBBAAQAeAAAVgSQAkghgLgsQgFgSgNgPQgTgUgagEIAMgIQARgMABgTQABgSgQgOQgOgMgZgBIhWgBg");
	this.shape_150.setTransform(73.5464,38.2209,0.72,0.72);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147}]}).to({state:[]},75).wait(50));

	// text
	this.instance_2 = new lib.text();
	this.instance_2.setTransform(120.1,116,1.3,1.3,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},75).wait(50));

	// bg
	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("EgXbAnEMAAAhOHMAu3AAAMAAABOHg");
	this.shape_151.setTransform(120.0429,200.0039,0.8,0.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_151).wait(125));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(109.8,199.4,140.39999999999998,201.20000000000002);
// library properties:
lib.properties = {
	id: '94F6A025E22046B3AA8F78A53E9CFA7C',
	width: 240,
	height: 400,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"Bed.jpg", id:"Bed"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['94F6A025E22046B3AA8F78A53E9CFA7C'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;