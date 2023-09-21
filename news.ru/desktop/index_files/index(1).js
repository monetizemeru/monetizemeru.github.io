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



(lib.Closet = function() {
	this.initialize(img.Closet);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,250,442);// helper functions:

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


(lib._img = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AGZSPIgBgNIvrkUIgNAKIgPgCIgm8YIQijwIEIB4MAABAgGIjsCng");

	// img
	this.instance = new lib.Closet();
	this.instance.setTransform(-66.3,-117.05,0.53,0.53);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.1,-117,132.3,234.1);


(lib.achiev = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgeAzIAAgSIgOAAIAAgNIAOAAIAAgJIgOAAIAAgPIAOAAIAAguIAnAAQASAAAIAIQAJAJAAANQAAAOgJAIQgIAJgQAAIgYAAIAAAJIAiAAIAAANIgiAAIAAASgAgNgEIAWAAQAJAAAFgEQAEgEAAgIQAAgGgEgFQgFgDgJAAIgWAAg");
	this.shape.setTransform(21.95,0.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgWAvQgJgHgFgMIASAAQAFAKAMAAQAJAAAHgJQAGgIABgPQgJAKgOgBQgPABgLgKQgLgJAAgPQAAgOALgKQALgKAQAAQARAAALAMQALANAAAaQAAAKgCAKQgDAJgEAIQgFAIgIAEQgIAFgKAAQgMAAgJgGgAgPggQgGAGAAAIQAAAJAGAEQAGAFAJAAQAIAAAGgFQAGgEAAgJQAAgIgGgGQgGgEgIAAQgJAAgGAEg");
	this.shape_1.setTransform(8.975,0.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgWAvQgJgHgFgMIASAAQAFAKAMAAQAJAAAHgJQAGgIABgPQgJAKgOgBQgPABgLgKQgLgJAAgPQAAgOALgKQALgKAQAAQARAAALAMQALANAAAaQAAAKgCAKQgDAJgEAIQgFAIgIAEQgIAFgKAAQgMAAgJgGgAgPggQgGAGAAAIQAAAJAGAEQAGAFAJAAQAIAAAGgFQAGgEAAgJQAAgIgGgGQgGgEgIAAQgJAAgGAEg");
	this.shape_2.setTransform(-0.325,0.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgWAvQgJgHgFgMIASAAQAFAKAMAAQAJAAAHgJQAGgIABgPQgJAKgOgBQgPABgLgKQgLgJAAgPQAAgOALgKQALgKAQAAQARAAALAMQALANAAAaQAAAKgCAKQgDAJgEAIQgFAIgIAEQgIAFgKAAQgMAAgJgGgAgPggQgGAGAAAIQAAAJAGAEQAGAFAJAAQAIAAAGgFQAGgEAAgJQAAgIgGgGQgGgEgIAAQgJAAgGAEg");
	this.shape_3.setTransform(-9.625,0.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgbAoQgKgMAAgaQAAgKACgJQACgKAFgHQAFgIAHgGQAJgEAKAAQANAAAJAHQAIAGAFANIgSAAQgFgKgMAAQgKgBgGAJQgHAIgBAPQAKgKANAAQAPAAALAKQAKAJAAAPQABAOgLAKQgKAKgRAAQgRAAgLgNgAgNAFQgGAGAAAIQAAAIAGAFQAGAFAHABQAJgBAHgFQAGgFAAgIQAAgIgGgGQgHgFgJAAQgHAAgGAFg");
	this.shape_4.setTransform(-22.1,0.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AkCCDQgqgkgDg3QgEg2AkgqQAkgpA3gEQCggMCagsQA2gPAwAbQAwAaAPA1QAPA1gbAvQgaAwg1APQi2A1i8ANIgLABQgwAAglghg");
	this.shape_5.setTransform(0.0171,0.0271);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.achiev, new cjs.Rectangle(-30.4,-16.3,60.9,32.7), null);


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

	// img
	this.instance = new lib._img();
	this.instance.setTransform(0.3,0.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75));

	// rounds
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#965EEB").s().p("AkXEYQh0h0AAikQAAijB0h0QB0h0CjAAQCkAAB0B0QB0B0AACjQAACkh0B0Qh0B0ikAAQijAAh0h0g");
	this.shape.setTransform(-11.95,-89,0.7,0.7,0,0,0,-0.6,1.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF4053").s().p("Ak2E3QiBiBAAi2QAAi1CBiBQCBiBC1AAQC2AACBCBQCBCBAAC1QAAC2iBCBQiBCBi2AAQi1AAiBiBg");
	this.shape_1.setTransform(53.4,66.85,0.9,0.9,0,0,0,-0.6,1.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00AAFF").s().p("AmfGgQitisAAj0QAAjzCtisQCsitDzAAQD0AACtCtQCsCsAADzQAAD0isCsQitCtj0AAQjzAAisitg");
	this.shape_2.setTransform(74.85,-35.5,1.0798,1.0798,0,0,0,-1.5,-0.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#04E061").s().p("Ao/JAQjvjuAAlSQAAlQDvjvQDujvFRAAQFRAADvDvQDvDvAAFQQAAFSjvDuQjvDvlRAAQlRAAjujvg");
	this.shape_3.setTransform(-58.5765,19.4692);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(75));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140,-117.6,280.1,234.89999999999998);


// stage content:
(lib.Avito_BMMFurniture_Closet_300x250_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(150,125.0086,1,0.4157);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(125));

	// achiev
	this.instance = new lib.achiev();
	this.instance.setTransform(189.15,147.35,0.64,0.64,0,0,0,0.5,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},75).wait(50));

	// center
	this.instance_1 = new lib.center();
	this.instance_1.setTransform(150.9,163.1,0.44,0.44,0,0,0,0.1,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},75).wait(50));

	// avito_logo
	this.instance_2 = new lib.ClipGroup();
	this.instance_2.setTransform(150.2,229.7,0.6,0.6,0,0,0,72.6,18.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(75).to({regX:72.4,regY:18.4,scaleX:1,scaleY:1,x:150.4,y:125.2},0).wait(50));

	// legal
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AgGAmIAAgfIgfAAIAAgNIAfAAIAAgfIANAAIAAAfIAfAAIAAANIgfAAIAAAfg");
	this.shape_1.setTransform(284.125,236.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AglA7IAAgOIAugsQAHgGADgFQAEgGAAgGQAAgKgGgGQgHgFgKAAQgIAAgHAEQgHAFgCAJIgQAAQADgPALgJQAKgJAQAAQARAAALAJQALAKAAAQQAAARgSAPIglAkIA5AAIAAAOg");
	this.shape_2.setTransform(274.35,234.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("AAFA6IAAhhIgYAWIAAgTIAXgVIAQAAIAABzg");
	this.shape_3.setTransform(265.55,234.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AgPAdQgGgFgCgHIAJAAQADAJALAAQAGAAAFgFQAEgDAAgHQAAgGgEgEQgFgCgGAAQgHgBgFAEIgJAAIAEgjIAmAAIAAAIIgeAAIgDASQAHgDAGAAQAJAAAHAGQAHAFAAAKQAAAJgHAHQgGAHgLAAQgIAAgHgFg");
	this.shape_4.setTransform(237,237.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQACgEAAgDQAAgGgDgDQgFgEgFAAQgEAAgEADQgEADgBAFIgJAAQABgIAHgGQAGgFAIAAQAJAAAHAGQAGAFAAAJQAAAKgKAIIgVAUIAgAAIAAAJg");
	this.shape_5.setTransform(231.3,237.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_6.setTransform(225.05,240.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgFQAAgHgHABIgRAAg");
	this.shape_7.setTransform(221.275,238.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#999999").s().p("AAJAXIgUgTIAAATIgJAAIAAgtIAJAAIAAAUIAUgUIAMAAIgYAWIAYAXg");
	this.shape_8.setTransform(216.15,238.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_9.setTransform(209.725,240.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_10.setTransform(206.45,237.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#999999").s().p("AgFAGIAAgLIAKAAIAAALg");
	this.shape_11.setTransform(201.35,240.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#999999").s().p("AAKAXIgWgTIAAATIgIAAIAAgtIAIAAIAAAUIAWgUIALAAIgYAWIAYAXg");
	this.shape_12.setTransform(198,238.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_13.setTransform(191.575,240.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#999999").s().p("AAIAhIAAgOIgjAAIAAgIIAggrIAKAAIggArIAZAAIAAgTIAJAAIAAATIALAAIAAAIIgLAAIAAAOg");
	this.shape_14.setTransform(187.55,237.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_15.setTransform(182.35,237.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_16.setTransform(177.25,240.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#999999").s().p("AATAdIAAgMIglAAIAAAMIgJAAIAAgUIAGAAQAFgFAAgNIAAgTIAkAAIAAAlIAIAAIAAAUgAgIgJQAAAMgDAGIAWAAIAAgeIgTAAg");
	this.shape_17.setTransform(172.95,239.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_18.setTransform(166.425,240.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEABQgDACgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_19.setTransform(162.475,238.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgFQAAgHgHABIgRAAg");
	this.shape_20.setTransform(157.225,238.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAGgGQAIgIAJABQAJgBAHAIQAGAGAAAKIAAADIgkAAQABAGAEADQAEAEAFAAQAJABADgHIAJAAQgCAHgGAEQgFADgIAAQgJAAgHgGgAAOgEQAAgFgEgDQgEgEgFABQgFgBgEAEQgEADgBAFIAbAAIAAAAg");
	this.shape_21.setTransform(151.5,238.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEABQgDACgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_22.setTransform(145.825,238.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#999999").s().p("AATAdIAAgMIgmAAIAAAMIgIAAIAAgUIAFAAQAGgFAAgNIAAgTIAlAAIAAAlIAHAAIAAAUgAgHgJQAAAMgFAGIAYAAIAAgeIgTAAg");
	this.shape_23.setTransform(140.05,239.225);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEABQgDACgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_24.setTransform(134.175,238.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#999999").s().p("AgaAhIAAhBIAxAAIAAAIIgoAAIAAASIAVAAQALAAAGAGQAGAFAAAIQAAAJgGAGQgGAFgLAAgAgRAZIAVAAQAGAAAEgDQAEgDAAgGQAAgFgEgDQgEgDgGAAIgVAAg");
	this.shape_25.setTransform(128.475,237.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#999999").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape_26.setTransform(121.5,240.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#999999").s().p("AAPAXIAAglIgTAAIAAALIAAAHIgBAHQgBAEgCACQgBACgDACQgDACgFAAIgDAAIAAgIIACAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIADgEIABgGIAAgGIAAgTIAkAAIAAAtg");
	this.shape_27.setTransform(117.225,238.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#999999").s().p("AgOAhIgFAAIAAgHIADAAQAEAAACgCIAEgHIACgFIgUgsIAKAAIAOAhIAQghIAJAAIgWAvIgGAOQgDAEgGAAg");
	this.shape_28.setTransform(112.075,239.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_29.setTransform(105.925,240.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#999999").s().p("AgRAXIAAgtIAjAAIAAAIIgaAAIAAAlg");
	this.shape_30.setTransform(102.775,238.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#999999").s().p("AgXAiIAAhBIAJAAIAAAEQAGgGAIAAQALAAAGAHQAHAHAAAKQAAAJgHAIQgGAHgLAAQgIAAgGgHIAAAagAgKgUQgEAEAAAHQAAAJAEACQAFAFAFAAQAHAAAEgFQAEgDAAgIQAAgGgEgFQgEgFgHAAQgFAAgFAFg");
	this.shape_31.setTransform(97.375,239.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#999999").s().p("AgOAhIgFAAIAAgHIADAAQAEAAACgCIAEgHIACgFIgUgsIAKAAIAOAhIAQghIAJAAIgWAvIgGAOQgDAEgGAAg");
	this.shape_32.setTransform(91.625,239.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#999999").s().p("AgRAaQgGgHAAgNQAAgPAFgIQAEgJALgBIAJgBQAHgBABgEIAIAAQAAAFgDADQgDAEgHABIgLABQgMABgBANQAGgHAKAAQAKAAAHAHQAGAGAAAKQAAAJgHAHQgHAHgKAAQgKAAgHgIgAgKAAQgEAEgBAHQABAGAEAFQAEAEAGAAQAHAAAEgEQAFgFgBgGQABgHgFgEQgEgEgHAAQgGAAgEAEg");
	this.shape_33.setTransform(86.15,237.625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#999999").s().p("AgXAiIAAhBIAJAAIAAAEQAGgGAIAAQALAAAGAHQAHAHAAAKQAAAJgHAIQgGAHgLAAQgIAAgGgHIAAAagAgKgUQgEAEAAAHQAAAJAEACQAFAFAFAAQAHAAAEgFQAEgDAAgIQAAgGgEgFQgEgFgHAAQgFAAgFAFg");
	this.shape_34.setTransform(80.325,239.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAHgGQAGgIAKABQAJgBAGAIQAHAGAAAKIAAADIgkAAQABAGAEADQAEAEAFAAQAJABADgHIAJAAQgCAHgGAEQgFADgIAAQgKAAgGgGgAAOgEQgBgFgDgDQgEgEgFABQgGgBgDAEQgEADgBAFIAbAAIAAAAg");
	this.shape_35.setTransform(74.35,238.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgSAAIAAAlg");
	this.shape_36.setTransform(69.15,238.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAGgGQAHgIAJABQAKgBAHAIQAGAGAAAKIAAADIgkAAQAAAGAFADQAEAEAFAAQAIABAFgHIAJAAQgDAHgFAEQgHADgHAAQgKAAgGgGgAAOgEQgBgFgDgDQgEgEgGABQgEgBgEAEQgEADgBAFIAbAAIAAAAg");
	this.shape_37.setTransform(63.95,238.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_38.setTransform(57.525,237.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#999999").s().p("AgMAEIAAgHIAZAAIAAAHg");
	this.shape_39.setTransform(51.9,238.35);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgRAAIAAAlg");
	this.shape_40.setTransform(47.5,238.6);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#999999").s().p("AAJAXIgUgTIAAATIgJAAIAAgtIAJAAIAAAUIAUgUIAMAAIgYAWIAYAXg");
	this.shape_41.setTransform(42.9,238.6);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#999999").s().p("AANAXIAAgUIgaAAIAAAUIgIAAIAAgtIAIAAIAAATIAaAAIAAgTIAJAAIAAAtg");
	this.shape_42.setTransform(37,238.6);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEABQgDACgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_43.setTransform(31.125,238.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#999999").s().p("AgVAYQgJgKgBgOQABgOAJgKQAKgJANAAQALgBAHAFQAIAFADAIIgKAAQgGgKgNABQgJgBgIAIQgHAHAAALQAAALAHAIQAIAHAJAAQANAAAGgKIAKAAQgDAJgIAFQgHAEgLAAQgNAAgKgKg");
	this.shape_44.setTransform(24.95,237.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#999999").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape_45.setTransform(17.9,240.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#999999").s().p("AgRAXIAAgtIAjAAIAAAIIgaAAIAAAlg");
	this.shape_46.setTransform(14.675,238.6);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_47.setTransform(177.075,229.225);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#999999").s().p("AgRAdQgGgGAAgJQgBgJAKgFQgJgGAAgJQAAgHAHgGQAGgGAKABQALgBAGAGQAHAGgBAHQABAJgJAGQAKAFgBAJQAAAJgGAGQgHAFgLAAQgKAAgHgFgAgLAGQgEADAAAFQABAFAEADQAEAEAGAAQAHAAAEgEQAFgDgBgFQABgFgFgDQgEgDgHAAQgGAAgFADgAgJgWQgFADAAAEQAAAFAEADQAEADAGAAQAHAAAEgDQADgDAAgFQAAgEgDgDQgEgDgHAAQgFAAgEADg");
	this.shape_48.setTransform(173,225.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_49.setTransform(167.75,225.875);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGAAQgKgBgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_50.setTransform(163.125,225.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGAAQgKgBgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_51.setTransform(157.375,225.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#999999").s().p("AgXATIAJAAQAEAHAJAAQAHAAAFgGQAEgHABgLQgDADgFACQgEACgFAAQgJAAgHgGQgHgGAAgJQAAgJAHgGQAHgHAKABQALAAAHAIQAHAHAAARQAAAGgCAHQgBAGgDAFQgDAFgGADQgFAEgGgBQgQAAgGgPgAgKgWQgFAEAAAGQAAAGAFAEQAEADAGAAQAGAAAEgDQAEgEAAgGQAAgGgEgEQgEgDgGAAQgGAAgEADg");
	this.shape_52.setTransform(151.575,225.9);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#999999").s().p("AACAhIAAg3IgMANIAAgLIAMgMIAJAAIAABBg");
	this.shape_53.setTransform(146.4,225.875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_54.setTransform(141.225,229.225);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#999999").s().p("AgPAdQgGgFgCgHIAJAAQAEAJAKAAQAGAAAFgFQAEgDAAgHQAAgGgEgEQgFgCgGAAQgHgBgFAEIgJAAIAEgjIAmAAIAAAIIgeAAIgCASQAFgDAHAAQAJAAAHAGQAHAFAAAKQAAAJgHAHQgGAHgLAAQgIAAgHgFg");
	this.shape_55.setTransform(137.2,225.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGAAQgKgBgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_56.setTransform(131.375,225.9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#999999").s().p("AgRAdQgHgGAAgJQAAgJAKgFQgJgGAAgJQAAgHAGgGQAHgGAKABQAKgBAHAGQAHAGAAAHQAAAJgJAGQAKAFAAAJQAAAJgIAGQgGAFgLAAQgKAAgHgFgAgKAGQgFADAAAFQAAAFAFADQAFAEAFAAQAGAAAFgEQAEgDABgFQgBgFgEgDQgEgDgHAAQgGAAgEADgAgJgWQgFADAAAEQAAAFAEADQAEADAGAAQAGAAAEgDQAFgDAAgFQAAgEgFgDQgEgDgGAAQgGAAgDADg");
	this.shape_57.setTransform(125.6,225.9);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#999999").s().p("AgRAaQgHgIAAgRQAAgGACgGQABgGADgFQAEgFAFgDQAFgDAGAAQAQAAAGAPIgJAAQgEgIgJABQgGgBgFAHQgGAGAAAMQADgDAFgCQAEgCAFgBQAJABAHAFQAHAGAAAKQAAAJgHAGQgHAHgKgBQgLABgHgJgAgJADQgEADAAAHQAAAFAEAEQAEAEAFAAQAHAAAEgEQAFgEAAgFQAAgHgFgDQgEgDgHAAQgFAAgEADg");
	this.shape_58.setTransform(119.625,225.9);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#999999").s().p("AAIAhIAAgOIgjAAIAAgIIAfgrIALAAIgfArIAYAAIAAgTIAJAAIAAATIALAAIAAAIIgLAAIAAAOg");
	this.shape_59.setTransform(113.6,225.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#999999").s().p("AACAhIAAg3IgMANIAAgLIAMgMIAJAAIAABBg");
	this.shape_60.setTransform(108.4,225.875);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#999999").s().p("AgKAgQgEgDgDgDIgEgIIgDgKIgBgIIABgIIADgJQACgFACgDQADgEAEgCQAFgCAFAAQAFAAAFACQAEACADAEQADADACAFIADAJIAAAIIAAAIIgDAKQgCAEgDAEQgDADgEADQgFACgFAAQgFAAgFgCgAgHgXQgDADgCAEQgCAEgBAEIgBAIIABAIQABAFACAEQACAEADACQADADAEAAQAFAAADgDQADgCACgEIADgJIAAgIIAAgIIgDgIQgCgEgDgDQgDgCgFAAQgEAAgDACg");
	this.shape_61.setTransform(103.65,225.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#999999").s().p("AgJAgQgFgDgCgDIgGgIIgCgKIAAgIIAAgIIACgJQADgFADgDQACgEAFgCQAEgCAFAAQAGAAAEACQAEACAEAEQADADABAFIACAJIACAIIgCAIIgCAKQgBAEgDAEQgEADgEADQgEACgGAAQgFAAgEgCgAgHgXQgDADgCAEQgCAEgBAEIAAAIIAAAIQABAFACAEQACAEADACQAEADADAAQAFAAADgDQADgCACgEIACgJIACgIIgCgIIgCgIQgCgEgDgDQgDgCgFAAQgDAAgEACg");
	this.shape_62.setTransform(97.4,225.9);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#999999").s().p("AgSAhIAfg5IgjAAIAAgIIAsAAIAAAIIgeA5g");
	this.shape_63.setTransform(91.65,225.875);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#999999").s().p("AAIAhIAAgOIgjAAIAAgIIAggrIAKAAIggArIAZAAIAAgTIAJAAIAAATIALAAIAAAIIgLAAIAAAOg");
	this.shape_64.setTransform(86,225.875);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#999999").s().p("AgRAdQgHgGABgJQAAgJAJgFQgJgGAAgJQAAgHAGgGQAHgGAKABQAKgBAHAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQABAJgIAGQgGAFgLAAQgKAAgHgFgAgLAGQgDADAAAFQgBAFAFADQAEAEAGAAQAGAAAFgEQAEgDAAgFQAAgFgEgDQgEgDgHAAQgGAAgFADgAgKgWQgEADAAAEQAAAFAEADQAEADAGAAQAGAAAFgDQADgDAAgFQAAgEgDgDQgFgDgGAAQgFAAgFADg");
	this.shape_65.setTransform(80,225.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#999999").s().p("AgSAhIAfg5IgjAAIAAgIIAsAAIAAAIIgeA5g");
	this.shape_66.setTransform(74.35,225.875);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#999999").s().p("AACAhIAAg3IgMANIAAgLIAMgMIAJAAIAABBg");
	this.shape_67.setTransform(69.45,225.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQADgEAAgDQAAgGgFgDQgEgEgFAAQgFAAgDADQgEADgBAFIgJAAQABgIAGgGQAGgFAJAAQAKAAAGAGQAGAFAAAJQAAAKgKAIIgVAUIAhAAIAAAJg");
	this.shape_68.setTransform(64.95,225.825);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGAAQgKgBgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_69.setTransform(59.175,225.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_70.setTransform(50.475,225.875);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#999999").s().p("AAUAhIAAg1IgmA1IgKAAIAAhBIAJAAIAAA1IAmg1IAKAAIAABBg");
	this.shape_71.setTransform(43.125,225.875);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#999999").s().p("AAUAhIAAgdIgmAAIAAAdIgJAAIAAhBIAJAAIAAAdIAmAAIAAgdIAJAAIAABBg");
	this.shape_72.setTransform(35.75,225.875);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#999999").s().p("AgaAhIAAhBIAgAAQAJAAAGAFQAGAFAAAJQAAAKgGAEQgGAFgJAAIgXAAIAAAbgAgRgCIAXAAQAFAAADgCQAEgDAAgGQAAgFgEgDQgDgDgFAAIgXAAg");
	this.shape_73.setTransform(28.975,225.875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#999999").s().p("AgWAhIAAhBIAtAAIAAAIIgkAAIAAA5g");
	this.shape_74.setTransform(22.925,225.875);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#999999").s().p("AgXAYQgKgKAAgOQAAgOAKgKQAJgJAOAAQAPAAAJAJQAKAKAAAOQAAAOgKAKQgJAKgPAAQgOAAgJgKgAgRgSQgHAHAAALQAAALAHAIQAHAHAKAAQALAAAHgHQAHgIAAgLQAAgLgHgHQgHgIgLABQgKgBgHAIg");
	this.shape_75.setTransform(15.95,225.9);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#999999").s().p("AgFALIAGgLIgFAAIAAgKIAKAAIAAALIgGAKg");
	this.shape_76.setTransform(229.675,217.525);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#999999").s().p("AgFAGIAAgLIAKAAIAAALg");
	this.shape_77.setTransform(227.45,216.95);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#999999").s().p("AAOAhIgegcIAAAcIgJAAIAAhBIAJAAIAAAdIAegdIAMAAIgjAgIAjAhg");
	this.shape_78.setTransform(223.65,214.175);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#999999").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape_79.setTransform(219.05,216.95);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#999999").s().p("AAeAhIAAgyIgZAyIgJAAIgZgyIAAAyIgJAAIAAhBIALAAIAbA4IAcg4IALAAIAABBg");
	this.shape_80.setTransform(213.125,214.175);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgFQAAgHgHABIgRAAg");
	this.shape_81.setTransform(203.425,215.2);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAGgGQAHgIAJABQALgBAFAIQAHAGAAAKIAAADIgkAAQAAAGAFADQAEAEAFAAQAIABAFgHIAJAAQgDAHgFAEQgHADgHAAQgKAAgGgGgAAOgEQgBgFgDgDQgEgEgGABQgEgBgEAEQgEADgBAFIAbAAIAAAAg");
	this.shape_82.setTransform(197.7,215.2);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#999999").s().p("AgXAiIAAhBIAJAAIAAAEQAGgGAIAAQALAAAGAHQAHAIAAAJQAAAJgHAHQgGAIgLAAQgIAAgGgHIAAAagAgKgUQgEAEAAAHQAAAJAEACQAFAFAFAAQAHAAAEgFQAEgDAAgIQAAgGgEgFQgEgFgHAAQgFAAgFAFg");
	this.shape_83.setTransform(192.075,216.15);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_84.setTransform(186.025,215.2);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#999999").s().p("AAKAXIgWgTIAAATIgIAAIAAgtIAIAAIAAAUIAWgUIALAAIgZAWIAZAXg");
	this.shape_85.setTransform(181.2,215.2);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAHgGQAHgIAJABQAIAAAGADQAFAFADAHIgJAAQgEgIgJABQgFAAgFAEQgEAFAAAGQAAAHAEAFQAFAEAFAAQAJAAAEgGIAJAAQgDAHgFAEQgGADgIAAQgJAAgHgGg");
	this.shape_86.setTransform(175.575,215.2);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#999999").s().p("AAOAXIAAghIgaAhIgJAAIAAgtIAJAAIAAAhIAaghIAIAAIAAAtg");
	this.shape_87.setTransform(169.8,215.2);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_88.setTransform(163.175,214.175);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#999999").s().p("AATAhIAAg5IglAAIAAA5IgJAAIAAhBIA3AAIAABBg");
	this.shape_89.setTransform(153.625,214.175);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#999999").s().p("AAUAhIAAg1IgmA1IgKAAIAAhBIAJAAIAAA1IAmg1IAKAAIAABBg");
	this.shape_90.setTransform(146.275,214.175);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgRAAIAAAlg");
	this.shape_91.setTransform(137.85,215.2);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#999999").s().p("AgQASQgHgIAAgKQAAgKAHgGQAGgIAKABQALgBAGAIQAHAGAAAKQAAAKgHAIQgGAGgLAAQgKAAgGgGgAgKgLQgFAFABAGQgBAHAFAFQAEAEAGAAQAHAAAEgEQAEgFAAgHQAAgGgEgFQgEgEgHAAQgGAAgEAEg");
	this.shape_92.setTransform(132.55,215.2);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#999999").s().p("AgQASQgHgIAAgKQAAgKAHgGQAGgIAKABQALgBAGAIQAHAGAAAKQAAAKgHAIQgGAGgLAAQgKAAgGgGgAgKgLQgFAFABAGQgBAHAFAFQAEAEAGAAQAHAAAEgEQAEgFABgHQgBgGgEgFQgEgEgHAAQgGAAgEAEg");
	this.shape_93.setTransform(124.45,215.2);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgRAAIAAAlg");
	this.shape_94.setTransform(119.15,215.2);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#999999").s().p("AAOAXIAAghIgaAhIgJAAIAAgtIAJAAIAAAhIAaghIAIAAIAAAtg");
	this.shape_95.setTransform(113.75,215.2);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgFQAAgHgHABIgRAAg");
	this.shape_96.setTransform(108.125,215.2);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#999999").s().p("AAYAhIgGgPIgjAAIgGAPIgKAAIAdhBIAJAAIAdBBgAAOAKIgOggIgOAgIAcAAg");
	this.shape_97.setTransform(101.8,214.175);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_98.setTransform(93.225,215.2);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#999999").s().p("AANAXIAAgTIgaAAIAAATIgIAAIAAgtIAIAAIAAATIAaAAIAAgTIAJAAIAAAtg");
	this.shape_99.setTransform(87.6,215.2);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#999999").s().p("AAOAXIgOgRIgNARIgKAAIATgXIgTgWIALAAIAMARIAOgRIAKAAIgTAWIATAXg");
	this.shape_100.setTransform(79.7,215.2);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#999999").s().p("AANAXIAAgPIgLAAIgMAPIgLAAIAOgQQgGgBgDgEQgCgEAAgEQAAgIAEgDQAFgFAIAAIAXAAIAAAtgAgHgNQgDACAAAFQAAADADACQACABAEAAIAOAAIAAgOIgOAAQgEAAgCABg");
	this.shape_101.setTransform(74.175,215.2);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#999999").s().p("AANAXIAAghIgaAhIgIAAIAAgtIAIAAIAAAhIAaghIAJAAIAAAtg");
	this.shape_102.setTransform(68.8,215.2);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#999999").s().p("AAOAXIAAgTIgaAAIAAATIgJAAIAAgtIAJAAIAAATIAaAAIAAgTIAIAAIAAAtg");
	this.shape_103.setTransform(62.8,215.2);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAGgGQAIgIAJABQAJgBAHAIQAGAGAAAKIAAADIgkAAQABAGAEADQAEAEAFAAQAJABADgHIAJAAQgCAHgGAEQgFADgIAAQgJAAgHgGgAAOgEQAAgFgEgDQgEgEgFABQgFgBgEAEQgEADgBAFIAbAAIAAAAg");
	this.shape_104.setTransform(57,215.2);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#999999").s().p("AAPAXIAAglIgTAAIAAALIAAAHIgBAHQgBAEgCACQgBACgDACQgDACgFAAIgDAAIAAgIIACAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIADgEIABgGIAAgGIAAgTIAkAAIAAAtg");
	this.shape_105.setTransform(51.075,215.2);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgFQAAgHgHABIgRAAg");
	this.shape_106.setTransform(45.875,215.2);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#999999").s().p("AANAXIAAgPIgLAAIgMAPIgLAAIAOgQQgGgBgDgEQgCgEAAgEQAAgIAEgDQAFgFAIAAIAXAAIAAAtgAgHgNQgDACAAAFQAAADADACQACABAEAAIAOAAIAAgOIgOAAQgEAAgCABg");
	this.shape_107.setTransform(40.025,215.2);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#999999").s().p("AgNAXIAAglIgOAAIAAgIIAXAAIAAAPIAPAAQAIAAAFAEQAEAEAAAGQAAAHgEAFQgFAEgIAAgAgEAPIAPAAQAEAAACgCQADgBAAgFQAAgDgDgCQgCgCgEAAIgPAAg");
	this.shape_108.setTransform(34.575,215.2);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#999999").s().p("AgRAaQgGgHAAgNQAAgPAFgIQAEgJAMgBIAIgBQAHgBABgEIAIAAQAAAFgDADQgEAEgGABIgLABQgMABgBANQAGgHAJAAQAKAAAIAHQAGAGAAAKQAAAJgHAHQgHAHgKAAQgKAAgHgIgAgKAAQgEAEgBAHQABAGAEAFQAFAEAFAAQAGAAAFgEQAFgFAAgGQAAgHgFgEQgFgEgGAAQgFAAgFAEg");
	this.shape_109.setTransform(28.75,214.225);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#999999").s().p("AgQASQgHgIAAgKQAAgKAHgGQAGgIAKABQALgBAGAIQAHAGAAAKQAAAKgHAIQgGAGgLAAQgKAAgGgGgAgKgLQgFAFABAGQgBAHAFAFQAEAEAGAAQAHAAAEgEQAEgFAAgHQAAgGgEgFQgEgEgHAAQgGAAgEAEg");
	this.shape_110.setTransform(22.85,215.2);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#999999").s().p("AgUAXIAAgtIAaAAQAHAAAEADQAEAEAAAFQAAAIgGACQAGADAAAIQAAAFgDAEQgEADgHAAgAgMAPIASAAQAHAAAAgFQAAgGgHAAIgSAAgAgMgDIARAAQAHAAAAgFQAAgHgHABIgRAAg");
	this.shape_111.setTransform(15.025,215.2);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#999999").s().p("AgFAGIAAgLIAKAAIAAALg");
	this.shape_112.setTransform(214.75,205.25);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#999999").s().p("AgRAXIAAgtIAjAAIAAAIIgaAAIAAAlg");
	this.shape_113.setTransform(211.525,203.5);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#999999").s().p("AgOAeQgGgEgDgKIAKAAQADAKAKAAQAHAAAEgDQAEgEAAgEQAAgGgEgDQgEgCgHAAIgGAAIAAgIIAHAAQAGAAAEgDQADgCAAgGQAAgEgDgDQgEgDgGAAQgKgBgEAKIgJAAQACgJAGgEQAHgFAIABQAKgBAGAGQAGAGAAAHQAAAJgIAGQAJAFAAAJQAAAJgHAGQgGAFgLAAQgHABgHgFg");
	this.shape_114.setTransform(203.675,202.5);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQADgEAAgDQgBgGgEgDQgDgEgGAAQgFAAgDADQgEADgBAFIgKAAQACgIAGgGQAGgFAJAAQAKAAAGAGQAGAFAAAJQAAAKgKAIIgVAUIAhAAIAAAJg");
	this.shape_115.setTransform(198.05,202.425);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#999999").s().p("AgKAgQgEgDgCgDIgGgIIgCgKIAAgIIAAgIIACgJQACgFAEgDQACgEAEgCQAFgCAFAAQAFAAAFACQAEACADAEQAEADABAFIACAJIABAIIgBAIIgCAKQgBAFgEADQgDADgEADQgFACgFAAQgFAAgFgCgAgHgXQgDADgCAEQgCAEAAAEIgBAIIABAIQAAAFACAEQACAEADACQADADAEAAQAEAAADgDQAEgCACgEIACgJIABgIIgBgIIgCgIQgCgEgEgDQgDgCgEAAQgEAAgDACg");
	this.shape_116.setTransform(192.15,202.5);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#999999").s().p("AgVAiIAAgJIAagZIAGgFQACgEAAgDQAAgGgDgDQgEgEgGAAQgEAAgEADQgEADgBAFIgKAAQACgIAGgGQAHgFAIAAQAKAAAGAGQAGAFAAAJQAAAKgKAIIgVAUIAgAAIAAAJg");
	this.shape_117.setTransform(186.15,202.425);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_118.setTransform(182.2,205.25);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#999999").s().p("AgJAgQgFgDgCgDIgGgIIgCgKIAAgIIAAgIIACgJQADgFADgDQACgEAFgCQAEgCAFAAQAGAAAEACQAEACAEAEQADADABAFIACAJIACAIIgCAIIgCAKQgBAFgDADQgEADgEADQgEACgGAAQgFAAgEgCgAgHgXQgDADgCAEQgCAEgBAEIAAAIIAAAIQABAFACAEQACAEADACQAEADADAAQAFAAADgDQADgCACgEIACgJIACgIIgCgIIgCgIQgCgEgDgDQgDgCgFAAQgDAAgEACg");
	this.shape_119.setTransform(177.95,202.5);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#999999").s().p("AADAhIAAg3IgOANIAAgLIAOgMIAJAAIAABBg");
	this.shape_120.setTransform(172.6,202.475);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#999999").s().p("AgEAGIAAgLIAKAAIAAALg");
	this.shape_121.setTransform(169.8,205.25);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#999999").s().p("AgRAdQgHgGAAgJQAAgJAKgFQgJgGAAgJQAAgHAGgGQAHgGAKABQAKgBAHAGQAHAGAAAHQAAAJgJAGQAKAFAAAJQAAAJgIAGQgGAFgLAAQgKAAgHgFgAgKAGQgFADAAAFQAAAFAFAEQAFADAFAAQAGAAAFgDQAEgEABgFQgBgFgEgDQgEgDgHAAQgGAAgEADgAgJgWQgFADAAAEQAAAFAEADQAEADAGAAQAGAAAEgDQAFgDAAgFQAAgEgFgDQgEgDgGAAQgGAAgDADg");
	this.shape_122.setTransform(165.65,202.5);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#999999").s().p("AACAhIAAg3IgNANIAAgLIANgMIAKAAIAABBg");
	this.shape_123.setTransform(160.4,202.475);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#999999").s().p("AgQASQgHgIAAgKQAAgKAHgGQAHgIAJABQAKgBAIAIQAGAGAAAKQAAAKgGAIQgIAGgKAAQgJAAgHgGgAgKgLQgEAFAAAGQAAAHAEAFQAFAEAFAAQAHAAAEgEQAFgFgBgHQABgGgFgFQgEgEgHAAQgFAAgFAEg");
	this.shape_124.setTransform(153.55,203.5);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#999999").s().p("AATAdIAAgMIgmAAIAAAMIgIAAIAAgUIAGAAQAFgFAAgNIAAgTIAlAAIAAAlIAHAAIAAAUgAgIgJQAAAMgEAGIAYAAIAAgeIgUAAg");
	this.shape_125.setTransform(147.5,204.125);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#999999").s().p("AATAXIAAgtIAJAAIAAAtgAgbAXIAAgtIAIAAIAAAPIAOAAQAIAAAEAEQAFAEAAAGQAAAHgFAFQgEAEgIAAgAgTAPIAOAAQAEAAACgCQACgBAAgFQAAgDgCgCQgCgCgEAAIgOAAg");
	this.shape_126.setTransform(138.625,203.5);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#999999").s().p("AAOAXIAAgUIgaAAIAAAUIgJAAIAAgtIAJAAIAAATIAaAAIAAgTIAIAAIAAAtg");
	this.shape_127.setTransform(132,203.5);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#999999").s().p("AANAXIAAglIgZAAIAAAlIgJAAIAAgtIArAAIAAAtg");
	this.shape_128.setTransform(126.075,203.5);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#999999").s().p("AgOAhIgFAAIAAgHIADAAQAEAAACgCIAEgHIACgFIgUgsIAKAAIAOAhIAQghIAJAAIgWAvIgGAOQgDAEgGAAg");
	this.shape_129.setTransform(120.525,204.525);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#999999").s().p("AgDAXIAAglIgSAAIAAgIIArAAIAAAIIgSAAIAAAlg");
	this.shape_130.setTransform(115.5,203.5);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAHgGQAHgIAJABQAIAAAGADQAFAFADAHIgJAAQgEgIgJABQgFAAgFAEQgEAFAAAGQAAAHAEAFQAFAEAFAAQAJAAAEgGIAJAAQgDAHgFAEQgGADgIAAQgJAAgHgGg");
	this.shape_131.setTransform(110.375,203.5);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#999999").s().p("AgQASQgHgIAAgKQAAgKAHgGQAHgIAJABQAKgBAIAIQAGAGAAAKQAAAKgGAIQgIAGgKAAQgJAAgHgGgAgKgLQgEAFgBAGQABAHAEAFQAEAEAGAAQAHAAAEgEQAFgFAAgHQAAgGgFgFQgEgEgHAAQgGAAgEAEg");
	this.shape_132.setTransform(104.7,203.5);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#999999").s().p("AATAdIAAgMIgmAAIAAAMIgIAAIAAgUIAFAAQAGgFAAgNIAAgTIAlAAIAAAlIAHAAIAAAUgAgHgJQAAAMgFAGIAYAAIAAgeIgTAAg");
	this.shape_133.setTransform(98.65,204.125);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#999999").s().p("AAOAXIAAghIgaAhIgJAAIAAgtIAJAAIAAAhIAaghIAIAAIAAAtg");
	this.shape_134.setTransform(90.35,203.5);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#999999").s().p("AAKAXIgWgTIAAATIgIAAIAAgtIAIAAIAAAUIAWgUIALAAIgZAWIAZAXg");
	this.shape_135.setTransform(85.15,203.5);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#999999").s().p("AATAdIAAgMIgmAAIAAAMIgIAAIAAgUIAGAAQAFgFAAgNIAAgTIAlAAIAAAlIAHAAIAAAUgAgIgJQAAAMgEAGIAYAAIAAgeIgUAAg");
	this.shape_136.setTransform(79.1,204.125);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#999999").s().p("AANAXIAAghIgaAhIgIAAIAAgtIAIAAIAAAhIAaghIAJAAIAAAtg");
	this.shape_137.setTransform(73.1,203.5);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#999999").s().p("AAJAXIgUgTIAAATIgJAAIAAgtIAJAAIAAAUIAUgUIAMAAIgZAWIAZAXg");
	this.shape_138.setTransform(67.9,203.5);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#999999").s().p("AgUAYQgLgKABgOQgBgOALgKQAJgJAOAAQAJgBAIAFQAHAFAFAIIgKAAQgIgKgLABQgKgBgHAIQgIAHABALQgBALAIAIQAHAHAKAAQALAAAIgKIAKAAQgFAJgHAFQgIAEgJAAQgOAAgJgKg");
	this.shape_139.setTransform(61.45,202.5);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#999999").s().p("AgFAGIAAgLIALAAIAAALg");
	this.shape_140.setTransform(54.4,205.25);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_141.setTransform(50.375,203.5);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#999999").s().p("AATAXIAAgdIgPAdIgHAAIgPgdIAAAdIgJAAIAAgtIAKAAIARAkIASgkIAKAAIAAAtg");
	this.shape_142.setTransform(44.175,203.5);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#999999").s().p("AgPAVQgFgEAAgIQAAgIAFgDQAGgDAJAAIAOAAQAAgKgOAAQgDAAgEACQgDABgCAEIgJAAQACgHAGgFQAGgDAHAAQAKAAAGAEQAGAFAAAJIAAAcIgIAAIAAgFQgGAHgJgBQgJAAgFgDgAgMAJQAAAIALgBQAGAAAEgDQAFgDAAgGIAAgCIgOAAQgMAAAAAHg");
	this.shape_143.setTransform(37.725,203.5);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#999999").s().p("AAPAXIAAglIgTAAIAAALIAAAHIgBAHQgBAEgCACQgBACgDACQgDACgFAAIgDAAIAAgIIACAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIADgEIABgGIAAgGIAAgTIAkAAIAAAtg");
	this.shape_144.setTransform(31.975,203.5);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#999999").s().p("AAKAXIgWgTIAAATIgIAAIAAgtIAIAAIAAAUIAWgUIALAAIgZAWIAZAXg");
	this.shape_145.setTransform(27.2,203.5);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#999999").s().p("AgPASQgHgIAAgKQAAgKAHgGQAHgIAIABQALgBAFAIQAHAGAAAKIAAADIgkAAQABAGAEAEQAEADAFAAQAJABAEgHIAJAAQgDAHgGAEQgFADgIAAQgJAAgHgGgAAOgEQgBgFgDgDQgEgEgGABQgFgBgDAEQgEADgBAFIAbAAIAAAAg");
	this.shape_146.setTransform(21.5,203.5);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#999999").s().p("AgaAhIAAhBIAgAAQAJAAAGAFQAGAFAAAJQAAAKgGAEQgGAFgJAAIgXAAIAAAbgAgRgCIAXAAQAFAAADgCQAEgDAAgGQAAgFgEgDQgDgDgFAAIgXAAg");
	this.shape_147.setTransform(15.625,202.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},75).wait(50));

	// logo
	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AEUBEIgDgCQgEgDABgEQgBgFAEgDIADgCIADgBIAEABIADACQADADAAAFQAAAEgDADIgDACIgEABgAgZBFIgHgCIAFgNIAEACIAFACQADAAADgCIAEgDIAvh4IALAAIA6CGIgTAAIgxhxIgBAAIglBfQgCAIgGAHIgFAEIgGABgAoRBFIg8hwIAAAAIAABuIgJAAIAAiHIANAAIA+BzIABAAIA/hzIANAAIAACHIgRAAIAAhtIgBAAIg9BvgAIFBDIAAgRIgCAAQgRAAgNgGQgLgFgIgHQgGgHgEgKQgDgIAAgHQAAgLAEgJQAEgJAHgIQAHgIALgDQAMgFANAAIAGAAIAAgPIASAAIAAAPIAHAAQAMAAAMAFQAKADAIAIQAPAPAAAWQAAAHgDAIQgDAKgHAHQgIAHgLAFQgNAGgQAAIgDAAIAAARgAIXAqIABAAQAHAAALgDQAJgEAFgGQAGgFADgIQADgJAAgHQAAgIgCgJQgCgGgGgHQgFgHgIgDQgIgFgMAAIgCAAgAHvgoQgIADgFAHQgGAGgCAIQgCAIAAAIQAAAHADAJQACAGAHAHQAFAGAJAEQALADAHAAIABAAIAAhXIgCAAQgMAAgIAFgAFPBDIAAiHIAtAAQALAAAJAEQAIADAGAGQAGAFACAHQADAIAAAIQAAAJgEAHQgDAIgGAEQgGAGgJADQgKAEgLAAIgXgEIAAA5gAFhACIAJADIALAAQAHAAAIgDQAGgCAEgEQAEgFACgGQACgHAAgFQAAgEgCgHQgDgGgEgFQgDgEgHgDQgGgDgIgBIgUAAgACOBDIAAiHIASAAIAAA7IAeAAQALAAAKADQAIADAHAFQAGAFACAHQADAGAAAGQAAAHgCAIQgEAIgEAEQgHAHgIADQgLAEgNAAgACgA7IAcAAQAGAAAGgDQAGgCAEgEQADgEADgGQACgGAAgFQAAgGgCgGQgDgGgEgDQgEgEgHgDQgFgBgIAAIgZAAgAiIBDIAAiHIBXAAIAAALIhGAAIAAAwIA8AAIAAAJIg8AAIAAA4IBGAAIAAALgAkQBDIAAiHIBTAAIAAALIhBAAIAAAwIAbAAQAQABAJADQAJACAGAFQAFAFADAIQACAHAAAGQAAAGgCAIQgDAIgFAEQgGAGgJADQgMAEgNAAgAj+A6IAbABIALgDQAHgCADgDQAFgEACgFQADgGAAgHQAAgFgCgHQgCgFgFgEQgFgFgFgCQgGgBgIAAIgZAAgAmKBDIAAiHIBYAAIAAALIhGAAIAAAwIA8AAIAAAJIg8AAIAAA4IBGAAIAAALg");
	this.shape_148.setTransform(171.0712,29.1924,0.6,0.6);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#C83D38").s().p("AgvB0QgEAAgCgBQgCgCAAgEIAAhnIACgFIAMgLQAKgHAJgEQAMgGAOgCIAGAAQATABANAUQASAbgFAnQgDAWgMAQQgNAUgaAAgAg3hrQAAgFACgBQACgCAEAAIAmAAQAXACAFAXQAGAZgKAVQgCAFgEADIgDABQgPACgPAHQgMAFgIAHIgLAJg");
	this.shape_149.setTransform(103.7266,28.3374,0.6,0.6);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AhfCPQgYgEgVgJQgXgKgRgOQgWgUgEgWIgBgLIABiZQABgOgFgRIgGgMIBXABQAYABAOAMQAQANgBATQgBATgRAMIgMAIQAaADATAVQANAPAFATQAMArglAhQgVASgdAAIhCAAIAIAHQAPAOAYAKQAVAIAWAEQAXAEAXgDIAFAAIARgDIAWgHQAUgJATgMQAZgRAVgVIgthUQgZgvgbg6IAACtQAAAOACAJIACAHQACAGADAEIgVAAQAHgMABgRIABgfIAAhOQAAgpgCgiIgCgLIgFgMQAOgDAKAFQAJAFAEALIBZCwIAEgGQAPgRANgTQAMgRAKgWQAKgUAHgXQAIgaABgQIAAgTQAAgHADgBIAFgBIAfAAQgHANgCANQgBAJAAAuIABB4QABASAEALIADAGIgtAAQAJgMAAgaIAAiPIgFARQgGAUgLAYQgLAWgMARQgMASgQAUIgGAHIASAlIgOAAQgKAAgDgCIgIgRQgUAUgaARQgVAOgTAIIgiAJIgMACIgPAAQgPAAgRgCgAiTguQgJAEgKAHIgMAMIgCAFIAABmQAAAEACACQACABAEAAIAxAAQAaAAANgUQAMgQADgWQAFgmgSgcQgNgUgTgBIgGAAQgPACgMAGgAiyiKQgCABAAAFIAABmIALgJQAIgHAMgFQAPgHAQgCIADgBQAEgDACgFQAKgVgGgZQgFgXgYgCIgmAAQgEAAgCACg");
	this.shape_150.setTransform(111.2237,29.8514,0.6,0.6);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#D92C2F").s().p("AhfEkIgbgKQg0gWgqgqQhahaAAiAQAAh+BahaQBahaB+AAQB/AABaBaQBaBaAAB+QAACAhaBaQgrAqgzAWIgbAKQgtAPgzAAQgzAAgsgPgAjThnQAGARgBAOIgBCaIABALQAEAWAWATQARAPAXAJQAVAJAYAEQAZAEAWgCIAMgBIAhgKQAUgIAVgOQAagQAUgVIAIARQADADAKgBIAOAAIgSglIAGgHQAQgTAMgTQALgRAMgXQALgXAGgTIAFgSIAACPQAAAagJAMIAtAAIgDgGQgEgLgBgSIgBh4QAAguABgIQABgOAIgNIggAAIgEABQgDACAAAGIAAATQgBARgJAaQgGAWgKAUQgKAVgNASQgMAUgPARIgEAFIhZiwQgEgLgKgFQgJgFgPAEIAGALIABALQACAiAAApIAABPIAAAeQgBASgIALIAWAAQgDgEgCgGIgCgHQgDgJABgOIAAitQAaA6AaAuIAtBWQgVAUgZARQgTAMgVAJIgVAHIgRADIgGAAQgWADgXgEQgWgEgWgIQgXgKgQgOIgHgHIBBAAQAeAAAVgSQAkghgLgsQgFgSgNgPQgTgUgagEIAMgIQARgMABgTQABgSgQgOQgOgMgZgBIhWgBg");
	this.shape_151.setTransform(111.2387,28.1424,0.6,0.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148}]}).to({state:[]},75).wait(50));

	// text
	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#04E061").ss(2,1,1).p("AtJhyIaTAAQAwAAAiAhQAhAiAAAvQAAAwghAhQgiAigwAAI6TAAQgvAAgigiQgighAAgwQAAgvAigiQAighAvAAg");
	this.shape_152.setTransform(150.1,63.25,0.85,0.85,0,0,0,0.2,0);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("AAAAXIAUgXIgUgWIAMAAIARASIAAAJIgRASgAgcAXIAVgXIgVgWIAOAAIAPASIAAAJIgPASg");
	this.shape_153.setTransform(194.075,102.325);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#000000").s().p("AgZAcIAAg3IALAAIAAATIASAAQALAAAFAFQAGAEAAAIQAAAJgGAFQgFAFgLAAgAgOATIASAAQAFAAADgDQADgCAAgFQAAgEgDgDQgDgCgFAAIgSAAg");
	this.shape_154.setTransform(187.95,102.375);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#000000").s().p("AASAcIAAguIgWAAIAAAPIgBAIIgCAIQgBAFgBADIgHAFQgDACgGAAIgDAAIAAgKIACAAQAEAAACgCQADgCAAgDIABgHIABgHIAAgYIAsAAIAAA3g");
	this.shape_155.setTransform(180.6,102.375);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#000000").s().p("AgTAVQgIgIAAgNQAAgMAIgIQAIgJAMAAQAMAAAHAJQAIAIAAAMIAAAEIgsAAQABAHAFAFQAFAEAGAAQALAAAEgIIAMAAQgDAJgHAEQgHAFgKAAQgLAAgJgJgAARgEQgBgHgEgEQgEgEgHAAQgGAAgFAEQgFAEgBAHIAhAAIAAAAg");
	this.shape_156.setTransform(173.975,102.375);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("AgVAgQgHgJAAgPQAAgTAFgKQAGgKANgCIALgBQAJgBABgGIALAAQgBAHgEAEQgEAEgIABIgOACQgOABgBAQQAHgJAMAAQAMAAAIAJQAIAHAAAMQAAAMgIAIQgJAJgMAAQgNAAgIgKgAgNAAQgFAFAAAIQAAAIAFAGQAGAFAHAAQAIAAAFgFQAGgGAAgIQAAgIgFgFQgGgFgIAAQgHAAgGAFg");
	this.shape_157.setTransform(167.025,101.175);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("AgTAVQgIgIAAgNQAAgMAIgIQAIgJAMAAQAMAAAHAJQAIAIAAAMIAAAEIgsAAQABAHAFAFQAFAEAGAAQALAAAEgIIAMAAQgDAJgHAEQgHAFgKAAQgLAAgJgJgAARgEQgBgHgEgEQgEgEgHAAQgGAAgFAEQgFAEgBAHIAhAAIAAAAg");
	this.shape_158.setTransform(159.925,102.375);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#000000").s().p("AAlApIAAg+IgfA+IgLAAIgfg+IAAA+IgLAAIAAhRIAOAAIAhBGIAihGIAOAAIAABRg");
	this.shape_159.setTransform(150.65,101.125);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("AAlApIAAg+IgfA+IgLAAIgfg+IAAA+IgLAAIAAhRIAOAAIAhBGIAihGIAOAAIAABRg");
	this.shape_160.setTransform(138.95,101.125);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("AgeApIAAhRIAlAAQAKAAAHAGQAIAGAAALQAAAMgKAFQAKAGAAAMQAAALgIAGQgHAGgKAAgAgTAeIAaAAQAGAAADgDQAEgDAAgGQAAgGgEgEQgDgDgGAAIgaAAgAgTgEIAaAAQAGAAADgDQAEgDAAgHQAAgGgEgDQgDgDgGAAIgaAAg");
	this.shape_161.setTransform(129.3,101.125);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AAPAXIgPgSIAAgJIAPgSIAOAAIgVAWIAVAXgAgLAXIgRgSIAAgJIARgSIAMAAIgUAWIAUAXg");
	this.shape_162.setTransform(121.925,102.325);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#000000").s().p("AgEAcIAAguIgWAAIAAgJIA1AAIAAAJIgWAAIAAAug");
	this.shape_163.setTransform(112.7,102.375);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#000000").s().p("AgUAVQgJgIAAgNQAAgMAJgIQAIgJAMAAQANAAAIAJQAJAIAAAMQAAANgJAIQgIAJgNAAQgMAAgIgJgAgNgNQgFAGAAAHQAAAJAFAFQAGAGAHAAQAJAAAEgGQAGgFAAgJQAAgHgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_164.setTransform(106.2,102.375);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("AApAwIAAhfIASAAIAABfgAg6AwIAAhfIASAAIAAAgIAeAAQAQAAAJAJQAKAIAAAOQAAAOgKAJQgJAJgQAAgAgoAgIAdAAQAJAAAEgEQAFgEAAgIQAAgIgFgEQgEgEgJAAIgdAAg");
	this.shape_165.setTransform(192.075,82.05);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AgIBbIAAgrIgKAAQgXABgOgNQgNgOAAgVQAAgVAOgNQAOgOAWAAIAKAAIAAgrIARAAIAAArIAKAAQAWAAAOAOQAOANAAAVQAAAVgNAOQgOANgXgBIgKAAIAAArgAAJAgIAJAAQAQABAJgKQAIgIAAgOQAAgNgJgKQgJgJgPAAIgJAAgAgpgWQgJAKAAANQAAAOAIAIQAJAKAQgBIAJAAIAAg/IgJAAQgPAAgJAJg");
	this.shape_166.setTransform(176.575,82);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#000000").s().p("AggArQgLgJAAgPQAAgQAMgHQALgHATAAIAdAAQAAgWgcAAQgIAAgHAEQgIAEgDAGIgTAAQAEgPAMgIQANgHAQAAQAVAAANAKQAMAJAAASIAAA8IgSAAIAAgLQgMANgUABQgSgBgKgHgAgZATQAAAPAXAAQANAAAJgHQAIgHAAgLIAAgFIgdAAQgYAAAAAPg");
	this.shape_167.setTransform(162.575,82.05);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("AAUAwIgtgoIAAAoIgSAAIAAhfIASAAIAAAqIAtgqIAYAAIg0AvIA0Awg");
	this.shape_168.setTransform(152.5,82.05);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#000000").s().p("AhEAwIAAhfIASAAIAABPIAqAAIAAhPIARAAIAABPIAqAAIAAhPIASAAIAABfg");
	this.shape_169.setTransform(137.875,82.05);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#000000").s().p("AggArQgLgJAAgPQAAgQAMgHQALgHATAAIAdAAQAAgWgcAAQgIAAgHAEQgIAEgDAGIgTAAQAEgPAMgIQANgHAQAAQAVAAANAKQAMAJAAASIAAA8IgSAAIAAgLQgMANgUABQgSgBgKgHgAgZATQAAAPAXAAQANAAAJgHQAIgHAAgLIAAgFIgdAAQgYAAAAAPg");
	this.shape_170.setTransform(118.525,82.05);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#000000").s().p("AAcAwIAAgpIg3AAIAAApIgSAAIAAhfIASAAIAAAnIA3AAIAAgnIASAAIAABfg");
	this.shape_171.setTransform(106.8,82.05);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#000000").s().p("AAUA9QgKgKAAgPQAAgOAKgKQAKgLAPAAQAPAAALALQAKAKAAAOQAAAPgKAKQgLAKgPAAQgPAAgKgKgAAgAXQgFAFAAAIQAAAIAFAFQAGAGAHAAQAIAAAGgGQAFgFAAgIQAAgIgFgFQgGgGgIAAQgHAAgGAGgAgwBFIBQiJIASAAIhQCJgAhGgLQgKgKAAgOQAAgOAKgKQALgLAPAAQAPAAAKALQAKAKAAAOQAAAOgKAKQgKALgPAAQgPAAgLgLgAg6gwQgFAFAAAIQAAAIAFAFQAGAGAIAAQAHAAAGgGQAFgFAAgIQAAgIgFgFQgGgGgHAAQgIAAgGAGg");
	this.shape_172.setTransform(216.925,62.125);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#000000").s().p("AgUBDQgKgFgGgHQgFgIgFgJQgDgKgCgKIgBgSQAAgIABgJQACgKADgJQAFgKAFgIQAGgHAKgFQAJgFALAAQAMAAAKAFQAIAFAGAHQAHAIADAKQAEAJACAKQABAJAAAIIgBASQgCAKgEAKQgDAJgHAIQgGAHgIAFQgKAFgMAAQgLAAgJgFgAgQgwQgGAFgEAIQgEAJgBAJQgDAJAAAIQAAAJADAJQABAKAEAIQAEAIAGAFQAIAFAIAAQAJAAAHgFQAHgFAEgIQAEgIACgKIABgSQAAgIgBgJQgCgJgEgJQgEgIgHgFQgHgFgJAAQgIAAgIAFg");
	this.shape_173.setTransform(201.3,62.125);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#000000").s().p("AgeA/QgNgKgFgSIATAAQAIATAWAAQANAAAIgGQAJgGAAgLQAAgLgIgGQgIgHgOAAIgPAAIAAgQIAPAAQAOAAAHgGQAIgGAAgKQAAgKgIgGQgIgGgNAAQgWAAgHATIgTAAQAEgSAOgJQANgKARAAQAWAAANAMQANALAAARQAAASgSAMQASAMAAAUQAAARgNAMQgNAMgWAAQgSAAgNgJg");
	this.shape_174.setTransform(188.475,62.125);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#000000").s().p("AgjAkQgOgOAAgWQAAgVAOgOQAOgOAVAAQAVAAAPAOQAOAOAAAVQAAAWgOAOQgPAOgVAAQgVAAgOgOgAgWgXQgJAKAAANQAAAOAJAKQAJAKANAAQAOAAAJgKQAJgKAAgOQAAgNgJgKQgJgKgOAAQgNAAgJAKg");
	this.shape_175.setTransform(171.875,64.25);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#000000").s().p("AAoA9IAAgaIhPAAIAAAaIgSAAIAAgqIALAAQAMgLAAgcIAAgoIBNAAIAABPIAPAAIAAAqgAgQgVQAAAagIAOIAxAAIAAg/IgpAAg");
	this.shape_176.setTransform(159.175,65.55);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#000000").s().p("AAcAwIAAhFIg3BFIgSAAIAAhfIASAAIAABFIA3hFIASAAIAABfg");
	this.shape_177.setTransform(141.9,64.25);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#000000").s().p("AAUAwIgtgoIAAAoIgSAAIAAhfIASAAIAAAqIAtgqIAYAAIg0AvIA0Awg");
	this.shape_178.setTransform(131.05,64.25);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#000000").s().p("AAoA9IAAgaIhPAAIAAAaIgSAAIAAgqIALAAQAMgLAAgcIAAgoIBNAAIAABPIAPAAIAAAqgAgQgVQAAAagIAOIAxAAIAAg/IgpAAg");
	this.shape_179.setTransform(118.325,65.55);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#000000").s().p("AAcAwIAAhFIg3BFIgSAAIAAhfIASAAIAABFIA3hFIASAAIAABfg");
	this.shape_180.setTransform(105.85,64.25);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#000000").s().p("AAUAwIgtgoIAAAoIgSAAIAAhfIASAAIAAAqIAtgqIAYAAIg0AvIA0Awg");
	this.shape_181.setTransform(95,64.25);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("AgsAzQgVgUABgfQgBgeAVgUQAVgVAdAAQAUAAAQAKQAPAKAIARIgVAAQgOgTgYAAQgWAAgPAPQgPAQAAAWQAAAXAPAQQAPAPAWAAQAYAAAOgTIAVAAQgIARgPAKQgQAKgUAAQgdAAgVgVg");
	this.shape_182.setTransform(81.6,62.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152}]}).to({state:[]},75).wait(50));

	// bg
	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("A3bTiMAAAgnDMAu3AAAMAAAAnDg");
	this.shape_183.setTransform(150,125);

	this.timeline.addTween(cjs.Tween.get(this.shape_183).wait(125));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(149.5,124.5,151,126);
// library properties:
lib.properties = {
	id: '94F6A025E22046B3AA8F78A53E9CFA7C',
	width: 300,
	height: 250,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"Closet.jpg", id:"Closet"}
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