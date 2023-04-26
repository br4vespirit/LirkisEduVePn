/**
 * @param {string} url - A DOMString representing the URL to send the request to.
 * @returns {Object} Returns an object representing the parsed CPN data.
 */
export async function loadCPNData(url) {
  const response = await fetch(url);
  const cpnText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(cpnText, 'text/xml');
  const obj = xmlToJson(xmlDoc).workspaceElements.cpnet.page;

  const data = {places: [], arcs: [], transitions: []};
  const places = obj.place;
  const transitions = obj.trans;
  const arcs = obj.arc;
  places.forEach((element) => {
    data.places.push({
      id: element['@attributes'].id,
      name: element.text['#text'],
      marking: element.initmark.text['#text'] ?
        parseInt(
          element.initmark.text['#text'].replace("`()", '')
        )
        :
        0
    });
  });
  transitions.forEach((element) => {
    data.transitions.push({
      id: element['@attributes'].id,
      name: element.text['#text']
    });
  });
  arcs.forEach((element) => {
    switch (element['@attributes'].orientation){
      case 'PtoT':
        data.arcs.push({
          id: element['@attributes'].id,
          source: element.placeend['@attributes'].idref,
          target: element.transend['@attributes'].idref,
          markingWeight: parseInt(
            (element.annot.text['#text']).replace("`()", '')
          )
        });
        break;
      case 'TtoP':
        data.arcs.push({
          id: element['@attributes'].id,
          source: element.transend['@attributes'].idref,
          target: element.placeend['@attributes'].idref,
          markingWeight: parseInt(
            (element.annot.text['#text']).replace("`()", '')
          )
        });
        break;
      case 'BOTHDIR':
        data.arcs.push({
          id: element['@attributes'].id,
          source: element.transend['@attributes'].idref,
          target: element.placeend['@attributes'].idref,
          markingWeight: parseInt(
            (element.annot.text['#text']).replace("`()", '')
          )
        });
        data.arcs.push({
          id: element['@attributes'].id,
          source: element.placeend['@attributes'].idref,
          target: element.transend['@attributes'].idref,
          markingWeight: parseInt(
            (element.annot.text['#text']).replace("`()", '')
          )
        });
        break;
    }

  });

  return data;
}

/**
 * @param {XMLDocument} xml - xml document to be parsed. It inherits from the generic
 *  Document and does not add any specific methods or properties to it.
 * @returns - Return parsed xml document to object.
 */
function xmlToJson(xml) {
  // Create an empty object to store the JSON data
  var obj = {};

  // If the input XML is a text string, parse it into an XML document
  if (typeof xml === 'string') {
    var parser = new DOMParser();
    xml = parser.parseFromString(xml, 'text/xml');
  }

  // Recursively loop through each child node of the XML document
  if (xml.nodeType === 1) { // element node
    // If the element has attributes, create an object to store them
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // text node
    obj = xml.nodeValue.trim();
  }

  // Loop through each child node of the current element node
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var child = xml.childNodes.item(i);
      var nodeName = child.nodeName;

      // If the child node is an element, recursively convert it to JSON
      if (child.nodeType === 1) {
        if (!obj[nodeName]) {
          obj[nodeName] = xmlToJson(child);
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(xmlToJson(child));
        }
      } else if (child.nodeType === 3) { // text node
        if (!obj[nodeName]) {
          obj[nodeName] = xmlToJson(child);
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(xmlToJson(child));
        }
      }
    }
  }
  // Return the JSON object
  return obj;
}

