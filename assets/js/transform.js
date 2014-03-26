(function () {
  var h = d3.select('.heading');

  var ex = "extraloyal.com_".split("");
  var extra = [];

  ex = ex.map(function (v, i) {
    return {
      value: v,
      id: i,
      position: i
    };
  });

  var mapName = function (target, existing) {
    result = [];
    var copy = target.slice();
    existing.forEach(function (v, i) {
      result.push(copy.indexOf(v));
      copy.splice(copy.indexOf(v), 1, "$");
    });
    console.log("RESULT", result);
    return result;
  }

  mapName("alex_taylor".split(""), "extraloyal.com_".split("")).forEach(function (v, i) {
    if (v >= 0) {
      extra.push({
        value: ex[i].value,
        id: i,
        position: v
      });
    }
  });
  // console.log(extra);

  var render = function (data) {
    var totalWidth = 0;
    var selection = h.selectAll('div')
      .data(data, function (d) {
        return d.id;
      })

    //UPDATE
    selection
      .style('-webkit-transform', function (d) {
        left = totalWidth;
        totalWidth += d3.select(this).node().offsetWidth;

        return 'translateX(' + left + 'px)';
      });

    //ENTER
    selection.enter()
      .append('div')
      .attr('class', 'letter')
      .style('opacity', function (d) {
        return d.value === "_" ? 0 : 1;
      })
      .text(function (d) {
        return d.value;
      })
      .style('-webkit-transform', function (d) {
        left = totalWidth;
        totalWidth += d3.select(this).node().offsetWidth;

        return 'translateX(' + left + 'px)';
      })

    //EXIT
    selection.exit()
      .style("-webkit-transform", "translateX(600px)")
      .style("opacity", 0)
      .transition()
      .duration(200)
      .remove();
  };

  render(ex);
  console.log(extra);
  setTimeout(function () {
    render(extra.sort(function (a, b) {
      return a.position - b.position;
    }));
    
    document.querySelector('.subheading').className = 'subheading';     

  }, 3000);



})();
