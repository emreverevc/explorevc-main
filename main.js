var word_scroll_counter = 0;
var word_scroll = setInterval(function () {
    word_scroll_counter++;
    console.log(word_scroll_counter)
    const show = document.querySelector('span[data-show]')
    const next = show.nextElementSibling || document.querySelector('span:first-child')
    const up = document.querySelector('span[data-up]')
    
    if (up) {
    up.removeAttribute('data-up')
    }
    
    show.removeAttribute('data-show')
    show.setAttribute('data-up', '')
    
    next.setAttribute('data-show', '')
    if (word_scroll_counter >= 4) {
        clearInterval(word_scroll);
    }
}, 2000);

window.onload = function() {

    const counter = document.getElementById('blahblah');
    const observer = new IntersectionObserver(onIntersection, options);

    observer.observe(counter);

    document.getElementById("pre-select-container").onmousemove = e => {
        for(const card of document.getElementsByClassName("pre-select-card")) {
        const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
    
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        };
    }

    if (card_view_selected) {
        createGrid(fundsArray);
    } else {
        createTable(fundsArray);
        generateMoreInfo();
    }
    

    generateFilterOptions();
}

// danger below
// window.onload = function () {
//     createTable(fundsArray);
//     generateMoreInfo();
//     generateFilterOptions();
//   }
  
  var investment_stage_filters = [];
  var sector_filters = [];
  var geography_filters = [];
  var underrepresentedGP_filters = [];
  var card_view_selected = true;
  var table_view_selected = false;

  function reset_filters() {
    var chkinput = document.getElementById("dropdown_filter_item_select_all_investment_stage");
    chkinput.click();
    var chkinput = document.getElementById("dropdown_filter_item_select_all_sector");
    chkinput.click();
    var chkinput = document.getElementById("dropdown_filter_item_select_all_geography");
    chkinput.click();
    var chkinput = document.getElementById("dropdown_filter_item_select_all_underrepresentedGP");
    chkinput.click();
  }


  
function createTable(tableData) {
  
  main.replaceChildren()
  
  if (investment_stage_filters.length == 0 && sector_filters.length == 0 && geography_filters == 0 && underrepresentedGP_filters == 0) {
      document.getElementById('reset_filters').style.visibility = 'hidden';
  } else {
      document.getElementById('reset_filters').style.visibility = 'visible';
  }
  
    for (var i = 0; i < tableData.length; i++) {
      var row = document.createElement('div');
      row.className="row";
      main.appendChild(row);
      
      
      var firm_name = document.createElement('div');
      var investment_stage = document.createElement('div');
      var sector_focus = document.createElement('div');
      var geography = document.createElement('div');
      var underrepresentedGP = document.createElement('div');
      
      firm_name.className="firm_name"; 
      investment_stage.className="investment_stage"; 
      sector_focus.className="sector_focus"; 
      geography.className="geography";
      underrepresentedGP.className="underrepresentedGP";
      
      firm_name.innerHTML=tableData[i]["FirmName"]; 
      investment_stage.innerHTML=tableData[i]["InvestmentStageFocus"]; 
      sector_focus.innerHTML=tableData[i]["PrimaryIndustry"]; 
      geography.innerHTML=tableData[i]["Geography"];
      underrepresentedGP.innerHTML=tableData[i]["UnderrepresentedGP"];
      
      row.appendChild(firm_name).focus();
      row.appendChild(investment_stage).focus();       
      row.appendChild(sector_focus).focus();
      row.appendChild(geography).focus();
      row.appendChild(underrepresentedGP).focus();
      
      
      var more_info = document.createElement('div');
      more_info.className="more_info";
      
      more_info.append(createMoreInfo(tableData, i));
      main.appendChild(more_info);
    
    }
  
    // var funds_filtered_array = [];
    // window.dataLayer.push({
    //     'funds_in_search': undefined
    //   });  
    //   for (i = 0; i < tableData.length; i++) {
    //     funds_filtered_array.push(tableData[i]["FirmName"]);
    //   };
    //   window.dataLayer = window.dataLayer || [];
    //     window.dataLayer.push({
    //     'event': 'Funds_in_Search', 
    //     'funds_in_search': funds_filtered_array
    //   });
  }
  
  function createMoreInfo(tableData, fund_num) {
    
    var content = document.createElement('div');
    content.className = "more_content"
    var row_1 = document.createElement('div');
    row_1.className = "more_info_row";
    var logo = document.createElement('div');
    logo.className = 'logo';
    var logo2 = document.createElement('img');
    logo2.className = 'logo2';
    logo2.setAttribute('src', tableData[fund_num]["BannerURL"]);
    content.appendChild(row_1);
    row_1.appendChild(logo);
    logo.appendChild(logo2);
    
    var learn_more = document.createElement('div');
    learn_more.className = "learn_more";
    var box = document.createElement('div');
    box.className = 'box-3';
    var button = document.createElement('div');
    button.className = "btn btn-three";
  button.onclick = function() {window.open(tableData[fund_num]["VerifiedSnapshot"]);};
    var text = document.createElement('span');
    text.textContent = "See the Snapshot";
    
    row_1.appendChild(learn_more);
    learn_more.appendChild(box);
    box.appendChild(button);
    button.appendChild(text);
    
    var row_3 = document.createElement('div');
    row_3.className = "more_info_row";
    var headquarters = document.createElement('div')
    headquarters.className = "headquarters";
    headquarters.textContent = "Headquarters:";
    var tag = document.createElement('span');
    tag.className = 'tag-item';
    tag.textContent = tableData[fund_num]["Location"];
    headquarters.appendChild(tag);
      
    content.appendChild(row_3);
    row_3.appendChild(headquarters);
    
    var row_5 = document.createElement('div');
    row_5.className = "more_info_row";
    var investment_stages = document.createElement('div')
    investment_stages.className = "investment_stages";
    investment_stages.textContent = "Investment Stages:";
    for (i = 0; i < tableData[fund_num]["InvestmentStageKeywords"].split(";").length; i++) {
      var tag = document.createElement('span');
      tag.className = 'tag-item';
      tag.textContent = tableData[fund_num]["InvestmentStageKeywords"].split(";")[i];
      investment_stages.appendChild(tag);
      
    }
    content.appendChild(row_5);
    row_5.appendChild(investment_stages);
    
    var row_4 = document.createElement('div');
    row_4.className = "more_info_row";
    var industry_keywords = document.createElement('div')
    industry_keywords.className = "industry_keywords";
    industry_keywords.textContent = "Industry Keywords:";
    for (i = 0; i < tableData[fund_num]["IndustryKeywords"].split(", ").length; i++) {
      var tag = document.createElement('span');
      tag.className = 'tag-item';
      tag.textContent = tableData[fund_num]["IndustryKeywords"].split(", ")[i];
      industry_keywords.appendChild(tag);
    }
    content.appendChild(row_4);
    row_4.appendChild(industry_keywords);
    
     
    
    var row_6 = document.createElement('div');
    row_6.className = "more_info_row";
    var woman_gp = document.createElement('div');
    woman_gp.className = "dei_metrics";
    woman_gp.textContent = "Woman GP:"
    var woman_gp_text = document.createElement('span');
    woman_gp_text.className = 'tag-item';
    woman_gp_text.textContent = tableData[fund_num]["FemaleGP"];
    woman_gp.appendChild(woman_gp_text);
    var diverse_gp = document.createElement('div');
    diverse_gp.className = "dei_metrics";
    diverse_gp.textContent = "Diverse GP:"
    var diverse_gp_text = document.createElement('span');
    diverse_gp_text.className = 'tag-item';
    diverse_gp_text.textContent = tableData[fund_num]["DiverseGP"];
    diverse_gp.appendChild(diverse_gp_text);
    var impact_focused = document.createElement('div');
    impact_focused.className = "dei_metrics";
    impact_focused.textContent = "Impact Focused:"
    var impact_focused_text = document.createElement('span');
    impact_focused_text.className = 'tag-item';
    impact_focused_text.textContent = tableData[fund_num]["Impact"];
    impact_focused.appendChild(impact_focused_text);
    
    row_6.appendChild(woman_gp);
    row_6.appendChild(diverse_gp);
    row_6.appendChild(impact_focused);
    
    content.appendChild(row_6);
    
    
    return content;
  
  
  }
  
  function generateMoreInfo() {
    var row = document.getElementsByClassName("row");
    var i;
  
    for (i = 0; i < row.length; i++) {
      row[i].addEventListener("click", function() {
        
        var blah = document.getElementsByClassName("row");
        for (w = 0; w < blah.length; w++) {
          if (row[w].classList.contains("row_selected")){
            if (row[w] == this) {
            
            } else {
              row[w].classList.remove("row_selected");
              var blahblah = row[w].nextElementSibling;
              if (blahblah.style.maxHeight){
                blahblah.style.maxHeight = null;
              } else {
                blahblah.style.maxHeight = blahblah.scrollHeight + "px";
              }
            }
          }
        }
        
        this.classList.toggle("row_selected");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
//         window.dataLayer = window.dataLayer || [];
//         window.dataLayer.push({
//       'event': 'Fund_Clicked_On', 
//            'fund_clicked_on': this.firstChild.outerText 
//    });
      this.firstChild.outerText
      });
    }
  }
  
  
  function generateFilterOptions() {
    
      var investment_stage_filter = document.getElementById("dropdown_filter_list_investment_stage");
      
      var all_investment_stages = fundsArray.map(function (array) {
        return array.InvestmentStageFocus;});
      var investment_stages = [...new Set(all_investment_stages)];
      
      investment_stages.forEach(stage => {
            var filter_item = document.createElement('div');
            filter_item.className = "dropdown_filter_item";
            filter_item.id = "select_" + stage.replace(/ /g, '').toLowerCase();
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "investment_stage";
            checkbox.className = "checkbox";
            checkbox.id = "dropdown_filter_item_" + stage.replace(/ /g, '').toLowerCase();
            checkbox.setAttribute("onchange","filter_action(this)");
            checkbox.setAttribute('unchecked', 'unchecked');
            
            investment_stage_filter.appendChild(filter_item);
            filter_item.appendChild(checkbox);
            
            var label = document.createElement('label')
            label.className = "label";
            label.innerHTML = stage;
            label.setAttribute('for', checkbox.id);
            filter_item.appendChild(label);
            
          });
          
          
          var sector_filter = document.getElementById("dropdown_filter_list_sector");
      
      var all_sectors = fundsArray.map(function (array) {
        return array.PrimaryIndustry;});
      var sectors = [...new Set(all_sectors)];
      
      sectors.forEach(sector => {
            var filter_item = document.createElement('div');
            filter_item.className = "dropdown_filter_item";
            filter_item.id = "select_" + sector.replace(/ /g, '').toLowerCase();
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "sector";
            checkbox.className = "checkbox";
            checkbox.id = "dropdown_filter_item_" + sector.replace(/ /g, '').toLowerCase();
            checkbox.setAttribute("onchange","filter_action(this)");
            checkbox.setAttribute('unchecked', 'unchecked');
            sector_filter.appendChild(filter_item);
            filter_item.appendChild(checkbox);
            
            var label = document.createElement('label')
            label.className = "label";
            label.innerHTML = sector;
            label.setAttribute('for', checkbox.id);
            filter_item.appendChild(label);
            
          });
          
          
          var geography_filter = document.getElementById("dropdown_filter_list_geography");
      
      var all_geographies = fundsArray.map(function (array) {
        return array.Geography;});
      var geographies = [...new Set(all_geographies)];
      
      geographies.forEach(sector => {
            var filter_item = document.createElement('div');
            filter_item.className = "dropdown_filter_item";
            filter_item.id = "select_" + sector.replace(/ /g, '').toLowerCase();
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "geography";
            checkbox.className = "checkbox";
            checkbox.id = "dropdown_filter_item_" + sector.replace(/ /g, '').toLowerCase();
            checkbox.setAttribute("onchange","filter_action(this)");
            checkbox.setAttribute('unchecked', 'unchecked');
            geography_filter.appendChild(filter_item);
            filter_item.appendChild(checkbox);
            
            var label = document.createElement('label')
            label.className = "label";
            label.innerHTML = sector;
            label.setAttribute('for', checkbox.id);
            filter_item.appendChild(label);
            
          });
          
          
          var underrepresentedGP_filter = document.getElementById("dropdown_filter_list_underrepresentedGP");
      
      var all_underrepresentedGP = fundsArray.map(function (array) {
        return array.UnderrepresentedGP;});
      var underrepresentedGP = [...new Set(all_underrepresentedGP)];
      
      underrepresentedGP.forEach(sector => {
            var filter_item = document.createElement('div');
            filter_item.className = "dropdown_filter_item";
            filter_item.id = "select_" + sector.replace(/ /g, '').toLowerCase();
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "underrepresentedGP";
            checkbox.className = "checkbox";
            checkbox.id = "dropdown_filter_item_" + sector.replace(/ /g, '').toLowerCase();
            checkbox.setAttribute("onchange","filter_action(this)");
            checkbox.setAttribute('unchecked', 'unchecked');
            underrepresentedGP_filter.appendChild(filter_item);
            filter_item.appendChild(checkbox);
            
            var label = document.createElement('label')
            label.className = "label";
            label.innerHTML = sector;
            label.setAttribute('for', checkbox.id);
            filter_item.appendChild(label);
            
          });
      
      
      
  }
  
  function dropdown_filter_button(filter) {
    var id = filter.id.replace("button", "list");
    var dropdowns = document.getElementsByClassName("dropdown_filter_list");
    var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.id == id) {
         //
        } else if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          var active_buttons = document.getElementsByClassName("dropdown_filter_button");
          for (j = 0; j < active_buttons.length; j++) { 
            if (active_buttons[j].classList.contains('active_button')) {
            active_buttons[j].classList.remove("active_button");
            }
          }
        }
      }
    document.getElementById(id).classList.toggle("show");
    document.getElementById(filter.id).classList.toggle("active_button");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown_filter_list') && !event.target.matches('.dropdown_filter_button') && !event.target.matches('.dropdown_filter_item') && !event.target.matches('.checkbox') && !event.target.matches('.label') && !event.target.matches('.fa-solid')) {
      var dropdowns = document.getElementsByClassName("dropdown_filter_list");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          document.getElementById(openDropdown.id.replace("_list", "_button")).classList.remove("active_button");
        }
      }
    }
  }
  
  function filter_action(check_box) {
    if (check_box.id.includes("select_all")) {
      var parent = document.getElementById(check_box.id.replace('dropdown_filter_item_select_all_', 'dropdown_filter_list_'));
      
      const children = Array.from(parent.children)
  
      children.forEach(element => {
        if (element.id.includes("select_all")) {
  
        } else {
          document.getElementById(element.id.replace("select_", "dropdown_filter_item_")).checked = false;
  /*         document.getElementById(element.id.replace("select_", "applied_filter_checkbox_")).checked = false;
          document.getElementById(element.id.replace("select_", "applied_filter_item_")).classList.add("hide_filter"); */
        }
      });
      
      switch(check_box.name) {
          case "investment_stage":
            investment_stage_filters = [];
            break;
          case "sector":
            sector_filters = [];
            break;
          case "geography":
            geography_filters = [];
            break;
          case "underrepresentedGP":
            underrepresentedGP_filters = [];
            break;
          default:
            // code block
        }
      filteredArray = fundsArray.filter(filterData);

      if (card_view_selected) {
        createGrid(filteredArray);
        } else {
        createTable(filteredArray);
        generateMoreInfo();
        }

      console.log(investment_stage_filters);
      console.log(sector_filters);
      console.log(geography_filters);
      
    } else {
        /* var applied_filter_id = check_box.id.replace("dropdown_filter_item_", "applied_filter_checkbox_");
              var applied_filter = check_box.id.replace("dropdown_filter_item_", "applied_filter_item_"); */
        if (check_box.checked == true) {
        /* document.getElementById(applied_filter).classList.remove("hide_filter"); */
        
        
        switch(check_box.name) {
          case "investment_stage":
            investment_stage_filters.push(check_box.parentElement.textContent.trim());
            break;
          case "sector":
              sector_filters.push(check_box.parentElement.textContent.trim());
            break;
          case "geography":
              geography_filters.push(check_box.parentElement.textContent.trim());
            break;
          case "underrepresentedGP":
              underrepresentedGP_filters.push(check_box.parentElement.textContent.trim());
            break;
          default:
            // code block
        }
        
        console.log(investment_stage_filters);
        console.log(sector_filters);
        console.log(geography_filters);
        
        filteredArray = fundsArray.filter(filterData);
        if (card_view_selected) {
            createGrid(filteredArray);
            } else {
            createTable(filteredArray);
            generateMoreInfo();
            }
        /* document.getElementById(applied_filter_id).checked = true; */
        document.getElementById("dropdown_filter_item_select_all_" + check_box.name).checked = false;
      } else {
        /* document.getElementById(applied_filter_id).checked = false;
        document.getElementById(applied_filter).classList.add("hide_filter"); */
        
        switch(check_box.name) {
          case "investment_stage":
            var index = investment_stage_filters.indexOf(check_box.parentElement.textContent.trim());
            if (index > -1) { // only splice array when item is found
              investment_stage_filters.splice(index, 1); // 2nd parameter means remove one item only
            }
            break;
          case "sector":
            var index = sector_filters.indexOf(check_box.parentElement.textContent.trim());
            if (index > -1) { // only splice array when item is found
              sector_filters.splice(index, 1); // 2nd parameter means remove one item only
            }
            break;
          case "geography":
            var index = geography_filters.indexOf(check_box.parentElement.textContent.trim());
            if (index > -1) { // only splice array when item is found
              geography_filters.splice(index, 1); // 2nd parameter means remove one item only
            }
            break;
          case "underrepresentedGP":
            var index = underrepresentedGP_filters.indexOf(check_box.parentElement.textContent.trim());
            if (index > -1) { // only splice array when item is found
              underrepresentedGP_filters.splice(index, 1); // 2nd parameter means remove one item only
            }
            break;
          default:
            // code block
        }
        
        console.log(investment_stage_filters);
        console.log(sector_filters);
        console.log(geography_filters);
        
        
        filteredArray = fundsArray.filter(filterData);
        if (card_view_selected) {
            createGrid(filteredArray);
            } else {
            createTable(filteredArray);
            generateMoreInfo();
            }
      }    
    }
  }
  
  function applied_filter_action(check_box) {
    
    var filter_item_id = document.getElementById(check_box.id.replace("applied_filter_checkbox_", "dropdown_filter_item_"));
    var applied_filter_item_id = check_box.id.replace("applied_filter_checkbox_", "applied_filter_item_");
    
    if (check_box.checked == true) {
      document.getElementById(applied_filter_item_id).classList.remove("hide_filter");
      if (card_view_selected) {
        createGrid(filteredArray);
        } else {
        createTable(filteredArray);
        generateMoreInfo();
        }
      filter_item_id.checked = true;
    } else {
      filter_item_id.checked = false;
      document.getElementById(applied_filter_item_id).classList.add("hide_filter");
      
      switch(check_box.name) {
          case "investment_stage":
            var index = investment_stage_filters.indexOf(check_box.parentElement.textContent.trim());
            if (index > -1) { // only splice array when item is found
              investment_stage_filters.splice(index, 1); // 2nd parameter means remove one item only
            }
            break;
          case "sectors":
            var index = sector_filters.indexOf(check_box.parentElement.textContent.trim());
              if (index > -1) { // only splice array when item is found
                sector_filters.splice(index, 1); // 2nd parameter means remove one item only
              }
            break;
          case "geography":
            var index = geography_filters.indexOf(check_box.parentElement.textContent.trim());
              if (index > -1) { // only splice array when item is found
                geography_filters.splice(index, 1); // 2nd parameter means remove one item only
              }
            break;
          default:
            // code block
        }
        
        console.log(investment_stage_filters);
        console.log(sector_filters);
      
      filteredArray = fundsArray.filter(filterData);
      if (card_view_selected) {
        createGrid(filteredArray);
        } else {
        createTable(filteredArray);
        generateMoreInfo();
        }
    }
    
  }
  
  function filterData(data) {
    
    if (underrepresentedGP_filters.length == 0) {
      if (investment_stage_filters.length == 0 && sector_filters.length == 0 && geography_filters.length == 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length == 0 && sector_filters.length != 0 && geography_filters.length != 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length != 0 && sector_filters.length == 0 && geography_filters.length != 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry)  && geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length != 0 && sector_filters.length != 0 && geography_filters.length == 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length != 0 && sector_filters.length == 0 && geography_filters.length == 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length == 0 && sector_filters.length != 0 && geography_filters.length == 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length == 0 && sector_filters.length == 0 && geography_filters.length != 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry) && geography_filters.includes(data.Geography)&& !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length != 0 && sector_filters.length != 0 && geography_filters.length != 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else {
        console.log("error");
      }
    } else {
      if (investment_stage_filters.length == 0 && sector_filters.length == 0 && geography_filters.length == 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length == 0 && sector_filters.length != 0 && geography_filters.length != 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && geography_filters.includes(data.Geography) && underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length != 0 && sector_filters.length == 0 && geography_filters.length != 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry) && underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length != 0 && sector_filters.length != 0 && geography_filters.length == 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length != 0 && sector_filters.length == 0 && geography_filters.length == 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length == 0 && sector_filters.length != 0 && geography_filters.length == 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && !geography_filters.includes(data.Geography) && underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      } else if (investment_stage_filters.length == 0 && sector_filters.length == 0 && geography_filters.length != 0) {
        return (!investment_stage_filters.includes(data.InvestmentStageFocus) && !sector_filters.includes(data.PrimaryIndustry) && geography_filters.includes(data.Geography) && underrepresentedGP_filters.includes(data.UnderrepresentedGP));
    } else if (investment_stage_filters.length != 0 && sector_filters.length != 0 && geography_filters.length != 0) {
        return (investment_stage_filters.includes(data.InvestmentStageFocus) && sector_filters.includes(data.PrimaryIndustry) && geography_filters.includes(data.Geography) && !underrepresentedGP_filters.includes(data.UnderrepresentedGP));
      }
    }
  }
  

//   grid
function createGrid(tableData) {
    
    main.replaceChildren()
    
    if (investment_stage_filters.length == 0 && sector_filters.length == 0 && geography_filters == 0 && underrepresentedGP_filters == 0) {
        document.getElementById('reset_filters').style.visibility = 'hidden';
    } else {
        document.getElementById('reset_filters').style.visibility = 'visible';
    }

    var card_container = document.createElement('div');
    card_container.className="card-container";
    main.appendChild(card_container);
    
      for (var i = 0; i < tableData.length; i++) {
        var card = document.createElement('div');
        card.className="card";
        card_container.appendChild(card);

        var card_content = document.createElement('div');
        card_content.className="card-content";
        card.appendChild(card_content);
        
        
        var firm_name = document.createElement('div');
        firm_name.className="card-title"; 
        firm_name.innerHTML=tableData[i]["FirmName"]; 

        card_content.appendChild(firm_name).focus();


        var investment_stages = document.createElement('div');
        investment_stages.className = "investment_stages-card";
        for (w = 0; w < Math.min(tableData[i]["InvestmentStageKeywords"].split(",").length, 2); w++) {
            var tag = document.createElement('span');
            tag.className = 'card-tag-item';
            tag.textContent = tableData[i]["InvestmentStageKeywords"].split(",")[w];
            investment_stages.appendChild(tag);
        }

        card_content.appendChild(investment_stages).focus();
        
        var industry_keywords = document.createElement('div')
        industry_keywords.className = "industry_keywords-card";
        for (w = 0; w < Math.min(tableData[i]["IndustryKeywords"].split(", ").length, 4); w++) {
            var tag = document.createElement('span');
            tag.className = 'card-tag-item';
            tag.textContent = tableData[i]["IndustryKeywords"].split(", ")[w];
            industry_keywords.appendChild(tag);
        }

        card_content.appendChild(industry_keywords).focus();

        var see_snapshot = document.createElement('div');
        see_snapshot.className = "see-snapshot";
        see_snapshot.style.transitionDelay = "750ms"

        var word_see = document.createElement('span');
        word_see.className = "see-snapshot-word";
        word_see.style.transitionDelay = "300ms";
        word_see.innerHTML = "See&nbsp;";

        var word_the = document.createElement('span');
        word_the.className = "see-snapshot-word";
        word_the.style.transitionDelay = "380ms";
        word_the.innerHTML = "the&nbsp;";

        var word_snapshot = document.createElement('span');
        word_snapshot.className = "see-snapshot-word";
        word_snapshot.style.transitionDelay = "420ms";
        word_snapshot.innerHTML = "Snapshot";

        see_snapshot.appendChild(word_see).focus();
        see_snapshot.appendChild(word_the).focus();
        see_snapshot.appendChild(word_snapshot).focus();
        
        card_content.appendChild(see_snapshot).focus();
        
        card.appendChild(card_content).focus();

        card_container.appendChild(card).focus();
        
      }
    
      // var funds_filtered_array = [];
      // window.dataLayer.push({
      //     'funds_in_search': undefined
      //   });  
      //   for (i = 0; i < tableData.length; i++) {
      //     funds_filtered_array.push(tableData[i]["FirmName"]);
      //   };
      //   window.dataLayer = window.dataLayer || [];
      //     window.dataLayer.push({
      //     'event': 'Funds_in_Search', 
      //     'funds_in_search': funds_filtered_array
      //   });
    }

// toggle between views
function tableview() {
    filteredArray = fundsArray.filter(filterData);
    createTable(filteredArray);
    generateMoreInfo();

    var firm_name_header = document.getElementById('firm-name-header');
    firm_name_header.style.display = 'inline-block';

    var header_row = document.getElementById("header-row-main")
    header_row.style.gridTemplateColumns = "25% 20% 20% 20% 15%";
    header_row.style.columnGap = "1%";
    header_row.style.textAlign = "center";
    
    table_view_selected = true;
    card_view_selected = false;

 }

function cardview() {

    var firm_name_header = document.getElementById('firm-name-header');
    firm_name_header.style.display = 'none';

    var header_row = document.getElementById("header-row-main")
    header_row.style.gridTemplateColumns = "repeat(4, 23.875%)";
    header_row.style.columnGap = "1.5%";
    header_row.style.textAlign = "center";

    createGrid(filteredArray);

    table_view_selected = false;
    card_view_selected = true;

}
  
// animation stuff
const onIntersection = (entries, observer) => {
    for (const { isIntersecting, target } of entries) {
      if (isIntersecting) {
        runAnimations();
        observer.unobserve(target);
      }
    }
  };
  

const options = {
    root: null,
    rootMargin: '0px 0px',
    threshold: [0]
};


function pre_select_Underrepreseted() {
    
    document.getElementById("header-row-main").scrollIntoView({block: 'center',  behavior: 'smooth'});
    document.getElementById("dropdown_filter_item_yes").click();
}

function seetheFirms() {
    document.getElementById("header-row-main").scrollIntoView({block: 'center',  behavior: 'smooth'});
}


    // How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round( animationDuration / frameDuration );
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * ( 2 - t );

// The animation function, which takes an Element
const animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10 );
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = easeOutQuad( frame / totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = currentCount;
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration );
};

// Run the animation on all elements with a class of ‘countup’
const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
	countupEls.forEach( animateCountUp );
};

const fundsArray = [{FirmName: "Climactic VC" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Climactic/Screen+Shot+2022-05-31+at+11.43.06+AM.png" ,Geography: "North America" ,Location: "California" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "climate, early stage, impact" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1008501176/"},{FirmName: "Third Sphere" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Third+Sphere/thirdsphere.webp" ,Geography: "North America" ,Location: "Los Angeles, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Climate, Hardware, B2B SaaS, D2C" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/702965342/"},{FirmName: "Vitalize VC" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Vitalize/VitalizeVC_2color_logo.png" ,Geography: "North America" ,Location: "Chicago, USA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "future of work" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/868426413/"},{FirmName: "Coyote Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Coyote+Ventures/CoyoteVentures_Logo_SingleLine%2520copy.png" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "Women's Health, FemTech, Healthtech, Consumer, Digital Health, Sexual Wellness" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/994493272/"},{FirmName: "7G BioVentures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/7G/7glogo.png" ,Geography: "North America" ,Location: "Belmont, California" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Early (A-B),Growth,Seed" ,PrimaryIndustry: "Life Sciences" ,IndustryKeywords: "Life Science" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/493395629/"},{FirmName: "Preface Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Preface/prefacelogo.png" ,Geography: "North America" ,Location: "New York, NY" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Enterprise, SaaS, Cybersecurity, Fintech, Healthcare" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/867102173/"},{FirmName: "Unshackled Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Unshackled/unshackledventures.svg" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "Immigrant Founders" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/774553870/"},{FirmName: "Caravela VC" ,BannerURL: "" ,Geography: "South America" ,Location: "Sao Paulo, Sao Paulo" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B)" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Fintech, Marketplace B2B, Mobility, Health Tech, Payments" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/690019325/"},{FirmName: "Geek Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "New York, NY" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "Immigrant, Generalist, Software, AI, Tech, B2B, SaaS, Marketplaces" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/917302541/"},{FirmName: "Beyond Capital Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Beyond+Capital+Ventures/Beyond%2BCapital%2BB%26W%2Blogo.png" ,Geography: "Middle East & Africa" ,Location: "Dallas, TX & Nairobi, Kenya" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "Healthcare, FinTech, Agriculture, Agritech, Healthtech, Telemedicine, Femtech" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Mission One Capital" ,BannerURL: "" ,Geography: "North America" ,Location: "Miami, FL" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "ClimateTech, Fintech, Healthtech, Edtech" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/30474500/"},{FirmName: "Climate Capital" ,BannerURL: "" ,Geography: "North America" ,Location: "Washington, DC" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed" ,PrimaryIndustry: "Life Sciences" ,IndustryKeywords: "Climate, Biology" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/31228516/"},{FirmName: "Vault Fund" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Vitalize/VitalizeVC_2color_logo.png" ,Geography: "North America" ,Location: "Chicago, USA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed,Pre-seed" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "future of work" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/868426413/,https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Fortius Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B)" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "SaaS, Software" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/298011798/"},{FirmName: "Overture" ,BannerURL: "" ,Geography: "North America" ,Location: "Santa Monica, CA" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "Climate, Renewables, Clean Energy" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/940380573/"},{FirmName: "Supply Change Capital" ,BannerURL: "" ,Geography: "North America" ,Location: "Los Angeles, CA and Chicago, IL" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Foodtech, Supply Chain, Sustainability" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/371767824/"},{FirmName: "Muchmore Ventures" ,BannerURL: "" ,Geography: "Middle East & Africa" ,Location: "New York / Los Angeles / Tel Aviv" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Early (A-B),Growth,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Creator Economy, Gaming, Consumer Tech, Fintech, Ecommerce, Logistics, Supply Chain, Artificial Intelligence, Big Data, Enterprise SAAS" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/89224529/"},{FirmName: "Fiat Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Fiat/Fiatlogo.jpeg" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "FinTech" ,IndustryKeywords: "PropTech, Web3, Infrastructure, Lending, InsurTech" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/369117230/"},{FirmName: "E15 VC" ,BannerURL: "" ,Geography: "Asia-Pacific" ,Location: "Causeway Bay, Hong Kong" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "PIPE Equity,Post-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Deep Tech, Medical Devices, Deep Science" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/916495889/"},{FirmName: "Capital Midwest" ,BannerURL: "" ,Geography: "North America" ,Location: "Milwaukee, Wisconsin" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Early (A-B),Late" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "SaaS, B2B, Tech-Enabled Hardware, FinTech, MarTech, AdTech, Human Resources, Manufacturing" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/245353031/"},{FirmName: "Sunflower Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "Miami, Florida" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "FinTech, Web3, PropTech, HealthTech, Creator Economy, SaaS" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/994548494/"},{FirmName: "Asymmetry Ventures" ,BannerURL: "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fb4b97f0-62c2-4bf3-a3f7-8505b074cfde/Asymmetry_Venutres_Logo.jpeg" ,Geography: "North America" ,Location: "California, USA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Frontier Tech" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Starship Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "San Francisco" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Advanced Materials, Aerospace, AI, Energy, Logistics, , Manufacturing, Space" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "91 Ventures" ,BannerURL: "" ,Geography: "Middle East & Africa" ,Location: "Tel Aviv, Israel" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "B2B SaaS, DeepTech, eSports, MLOps, DevOps, AI, ML, eCommerce, Enterprise SW" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/298127617/"},{FirmName: "43 Capital" ,BannerURL: "" ,Geography: "North America" ,Location: "San Fransisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007753950/"},{FirmName: "rpv Global" ,BannerURL: "" ,Geography: "North America" ,Location: "Seattle, WA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Deep Tech, Neuroscience, Photonics, New Energy, New Materials" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/768808769/"},{FirmName: "Metrodora Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "New York, NY" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "Health, learning" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/30476550/"},{FirmName: "Tale Venture Partners" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/renditionDownload+(3).png" ,Geography: "North America" ,Location: "San Francisco" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "enterprise, B2B, B2B2C, robotics, deep learning, natural language processing, industrial automation, industrial IoT, computer vision" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/570784295/"},{FirmName: "Recursive Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "FinTech, InsurTech, PropTech, AI, Enterprise, SaaS, Data" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/623543727/"},{FirmName: "Sancus Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "Cupertino, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "AI, Blockchain, Open Source, Developer Tools" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "REFASHIOND Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/REFASHIOND/REFASHIOND_logo_SQUARE1+(1).png" ,Geography: "North America" ,Location: "New York, USA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Supply Chain; Software; Logistics; Manufacturing" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Ripple Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Ripple+Ventures/Ripple+Logo.png" ,Geography: "North America" ,Location: "" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Vested" ,BannerURL: "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3ae7f4b5-1918-4add-8c4a-1d312560b6bf/Screen_Shot_2022-10-13_at_9.19.56_AM.png" ,Geography: "North America" ,Location: "Weston, FL" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Other" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "Diversified" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/886501295/"},{FirmName: "Ganas Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Ganas/ganaslogo.png" ,Geography: "North America" ,Location: "Carlsbad, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Web2, Web3, Future of Work, Creator Economy, Latin America" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/371909254/"},{FirmName: "SNÃ˜CAP" ,BannerURL: "" ,Geography: "North America" ,Location: "Seattle, WA" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "ClimateTech, Food, Water, Waste, Industrial and Carbon" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/914229689/"},{FirmName: "Seed Milestone" ,BannerURL: "" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Manufacturing, AI, Supply Chain, Transportation, Logistics, Energy Infrastructure, ESG, Distribution, Production" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/774679701/"},{FirmName: "AFG Partners" ,BannerURL: "" ,Geography: "Asia-Pacific" ,Location: "Asia" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Post-seed" ,PrimaryIndustry: "FinTech" ,IndustryKeywords: "" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Beat VC" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Beat+VC/beat+logo.jpeg" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "AI/ML, Web3, Marketplaces, FinTech" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1008689472/"},{FirmName: "Indelible Ventures" ,BannerURL: "" ,Geography: "Asia-Pacific" ,Location: "Kuala Lumpur, Malaysia" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "B2B, SaaS" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1008269478/"},{FirmName: "Unbounded Capital" ,BannerURL: "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/40b16c50-2f02-49ed-a211-80ae091ecd38/unbounded.png" ,Geography: "North America" ,Location: "Austin, TX" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "FinTech" ,IndustryKeywords: "FinTech, Payments, Micropayments, Tokens, Blockchain, Web3, Gaming, Supply Chain" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/702824136/"},{FirmName: "Dcode Capital" ,BannerURL: "" ,Geography: "North America" ,Location: "Washington, DC, USA" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Growth" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Big Data, AI/ML, Cybersecurity, FinTech, Enterprise, IoT, Cloud, DevOps" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/273310405/"},{FirmName: "Nomadic Venture Partners" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Nomadic/nomadiclogo.jpeg" ,Geography: "North America" ,Location: "Denver, CO and Chicago, IL" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "Enterprise SaaS, ClimateTech, Manufacturing, Transportation" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/637361236/"},{FirmName: "Suffolk Technologies" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Suffolk/suffolklogo.png" ,Geography: "North America" ,Location: "Boston, MA" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Early (A-B),Growth" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Construction Tech, Contech, Proptech, Real Estate Tech, Sustainability, Built Environment" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/372148127/"},{FirmName: "Prospeq" ,BannerURL: "" ,Geography: "North America" ,Location: "Phoenix, AZ" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Early (A-B),Growth" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Software, hardware, manufactoring, consumer" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/768998138/"},{FirmName: "Alpine VC" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Alpine/Alpine+Logo.png" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "Consumer; Application; Marketplace; Internet; Prosumer; Software; Web3" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/62648220/"},{FirmName: "IGC" ,BannerURL: "" ,Geography: "North America" ,Location: "San Francisco, CA and Austin, TX" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Health Tech, Data, Disruptive Health, Sport Performance" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/916736804/"},{FirmName: "Horizon VC" ,BannerURL: "" ,Geography: "Europe" ,Location: "London, England" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Angel" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "Idea Stage, Alt VC, Friends and Family, Income Share Agreement" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "EÂ²JDJ" ,BannerURL: "https://pbs.twimg.com/profile_images/1336718762935001088/NxArquow_400x400.jpg" ,Geography: "North America" ,Location: "North America" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "D2C, retail, food service, grower network, non-traditional channels" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "SeaX Capital" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/SeaX/SeaX+Logo.jpg" ,Geography: "Asia-Pacific" ,Location: "" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Benhamou Global Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "Menlo Park, California" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B)" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1008716138/"},{FirmName: "GFT Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "Palo Alto, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Frontier Tech, AI, Blockchain, Robotics, Digital Healthcare, Mobility" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007856178/"},{FirmName: "Progression" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Progression/progressionlogo.jpg" ,Geography: "North America" ,Location: "Los Angeles, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "E-Commerce, Social Commerce, Consumer, Gaming, Web3" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/372042500/"},{FirmName: "Funnder VC" ,BannerURL: "" ,Geography: "North America" ,Location: "West New York, NJ" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "FinTech" ,IndustryKeywords: "Fintech, B2B, EMEA" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/608246619/"},{FirmName: "Impulsum VC" ,BannerURL: "" ,Geography: "North America" ,Location: "Santa Monica, California" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Healthcare; Finance; Consumer" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1008520619/"},{FirmName: "B37 Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/B37+Ventures/b37logo.webp" ,Geography: "North America" ,Location: "San Francisco, California" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Early (A-B),Growth" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Biotech, Foodtech, IoT, Logistics, Warehousing, Data, AI, Robotics, Future of Work, Payments, FinTech, Web3, AgTech, Mobility" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/636538672/"},{FirmName: "Jaza Rift" ,BannerURL: "" ,Geography: "Middle East & Africa" ,Location: "Nairobi, Kenya" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Life Sciences" ,IndustryKeywords: "healthcare, healthtech, medtech, devices, digital health, health insurance" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/595353718/"},{FirmName: "Behind Genius Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "San Diego, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Creator Tools, Dev Tools, Fintech, Health Tech, Gaming" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/326467854/"},{FirmName: "ICI" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/ICI/ICI+Fund.jpeg" ,Geography: "North America" ,Location: "USA and Israel" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "AI, WaterTech, AgTech, FinTech, Cybersecurity, EdTech" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/244369799/"},{FirmName: "Chainforest" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Chainforest/Chainforestlogo.png" ,Geography: "North America" ,Location: "New York, NY" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "Web3, Crypto, Enterprise" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/351306802/"},{FirmName: "Regeneration VC" ,BannerURL: "" ,Geography: "North America" ,Location: "" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Tau Ventures" ,BannerURL: "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e213bfe-b14d-40eb-8ac3-fefa664b5bf4/Tau_Ventures_Logo.png" ,Geography: "North America" ,Location: "Palo Alto, CA" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Early (A-B),Growth,Seed" ,PrimaryIndustry: "Life Sciences" ,IndustryKeywords: "" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "First Bight Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/First+Bight+Ventures/First+Bight+Ventures+Logo.png" ,Geography: "North America" ,Location: "Houston, Texas" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Post-seed,Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "Consumer; Deep Tech; EdTech; Fintech; Hardware; Impact; Infrastructure; Life Sciences; Other" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/986211561/"},{FirmName: "Maven Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "Palo Alto, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "Seed stage software startups tapping into new consumer behavior and trends" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007828503/"},{FirmName: "Astella Journey" ,BannerURL: "" ,Geography: "South America" ,Location: "SÃ£o Paulo, Brazil" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "SaaS, Marketplaces, Consumer, Industry Agnostic." ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/89728837/"},{FirmName: "Wayfinder Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Post-seed,Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "B2B, Developer Tools, FinTech, SaaS" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/867082702/"},{FirmName: "Blitzscaling Ventures" ,BannerURL: "https://www.notion.so/reverevc/Blitzscaling-Data-Capture-Template-854efeeb85224900ad167032990aad22#8aa1068fc5b4439288b97e74bfc70cf9" ,Geography: "North America" ,Location: "Palo Alto, CA" ,InvestmentStageFocus: "Growth" ,InvestmentStageKeywords: "Growth" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "IT, Scalability, Late Stage" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/62170190/"},{FirmName: "Palumni VC" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Palumni+Ventures/Screen+Shot+2022-05-03+at+4.43.45+PM.png" ,Geography: "North America" ,Location: "Palo Alto, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "Healthtech, fintech, SaaS, defensetech, security, carbon, enterprise, consumer, crypto, web3, devops, data" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "All In Capital" ,BannerURL: "" ,Geography: "Asia-Pacific" ,Location: "Mumbai, India" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "Sector Agnostic, Early Stage India" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/774065004/"},{FirmName: "Fabric VC" ,BannerURL: "" ,Geography: "North America" ,Location: "Los Angeles, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "cpg, consumer, tech, fintech, d2c, future of healthcare, future of workspace" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/31226458/"},{FirmName: "Coalition Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "Boston, MA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B)" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Frontier Tech, Dual Use, Commercial & Defense, Supply Chain, United States, Dynamism, National Security, Enterprise" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/30811341/"},{FirmName: "Dreamit Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/E2JDJ/NxArquow_400x400.jpg" ,Geography: "North America" ,Location: "Philadelphia, PA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Healthtech, Securetech, Cybersecurity, Digital Health" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/90163966/"},{FirmName: "541 Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/541Ventures/rep-2bba17d374b3befdd2188457f2c821ea2d71.png.jpeg" ,Geography: "North America" ,Location: "Los Angeles, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Frontier Tech, Big Data, Artificial Intelligence, Human-device Interfaces, Cybersecurity, Energy Solution, Energy Infrastructure" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/636764691/"},{FirmName: "Plum Alley" ,BannerURL: "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be50ee4c-9f75-42d9-8654-0c18bf2cf202/Plum_Alley_Logo.png" ,Geography: "North America" ,Location: "New York City, New York, USA" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B)" ,PrimaryIndustry: "Life Sciences" ,IndustryKeywords: "" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Pitbull Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "Los Angeles, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "B2B SAAS, Marketplace, Restaurant Tech" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/30549453/"},{FirmName: "Responsibly Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Draper Cygnus" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Draper+Cygnus/drapercygnus.svg" ,Geography: "South America" ,Location: "Buenos Aires, Argentina" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Decentralizaton; Deep Tech" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "STRIVE" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/STRIVE/strivelogo.png" ,Geography: "Asia-Pacific" ,Location: "Singapore" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "SaaS, DevInfra, B2B Marketplaces, B2B" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/13534961/"},{FirmName: "Orvel Ventures" ,BannerURL: "" ,Geography: "Asia-Pacific" ,Location: "Singapore, Singapore" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "EdTech, FinTech, HealthTech, ClimateTech, Web3, Cybersecurity" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/89266570/"},{FirmName: "Kaya Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Kaya/kayalogo.jpeg" ,Geography: "North America" ,Location: "Los Angeles, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "Health, Wellness, Consumer" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/351878748/"},{FirmName: "Impact X Capital" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/logo.png" ,Geography: "Europe" ,Location: "London, United Kingdom" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Web 3.0; metaverse; Covid impact; content; platforms" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007810277/"},{FirmName: "Amplify.LA" ,BannerURL: "" ,Geography: "North America" ,Location: "Los Angeles, California, United States" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "Vertical SaaS, Transportation/Logistics, Ecomm/Enablement, FinTech, Healthcare, Media/Gaming/Creator Economy" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/866469687/"},{FirmName: "Recharge Thematic Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Recharge/recharge_logo.jpeg" ,Geography: "North America" ,Location: "New York" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "FinTech, Healthcare" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/108821029/"},{FirmName: "Flex Capital" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Flexcap/flexcaplogo.png" ,Geography: "North America" ,Location: "New York, NY" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "FinTech" ,IndustryKeywords: "FinTech, Enterprise SaaS, HealthTech" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/369806991/"},{FirmName: "Illuminate Ventures" ,BannerURL: "" ,Geography: "North America" ,Location: "San Fransisco" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "MaC VC" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/MaC/maclogo.svg" ,Geography: "North America" ,Location: "" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007930987/"},{FirmName: "Kin Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Kin/kin+logo.svg" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1008235653/"},{FirmName: "Silicon Roundabout Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Silicon+Roundabout+Ventures/srvlogo.png" ,Geography: "Europe" ,Location: "London, UK" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "DeepTech, Big Data" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/351490247/"},{FirmName: "Looking Glass Capital" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Looking+Glass+Capital/looking-glass-capital.png" ,Geography: "North America" ,Location: "New York, NY" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Consumer" ,IndustryKeywords: "Health, Climate, Education, SMB SaaS, SMB Marketplaces," ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/371331258/"},{FirmName: "Better Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Better+Ventures/Better+Ventures+Logo.jfif" ,Geography: "North America" ,Location: "Oakland, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed,Seed" ,PrimaryIndustry: "Impact" ,IndustryKeywords: "Sustainability, Carbon Capture, Impact, Health Care" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/702682946/"},{FirmName: "Linchpin Health Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Linchpin/Linchpinlogo.png" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Life Sciences" ,IndustryKeywords: "Life Science, Clinical, Healthcare" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/13098151/"},{FirmName: "Smart Money Studio" ,BannerURL: "" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Early" ,InvestmentStageKeywords: "Early (A-B),Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Crypto, Blockchain, DeFi, Fintech" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/30713966/"},{FirmName: "Oyster Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Oyster+Ventures/Oyster+Ventures+Logo.png" ,Geography: "North America" ,Location: "San Francisco, CA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "FinTech" ,IndustryKeywords: "Deep Tech; Fintech; Web3; Lending & Investments; Payments; Platforms; Software" ,DiverseGP: "Yes" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/1007824403/"},{FirmName: "Cortado Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Cortado/cortado_logo.jpeg" ,Geography: "North America" ,Location: "Oklahoma" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Life Sciences" ,IndustryKeywords: "energy tech, logistics, life sciences, biotech, ag, transportation, materials, future of work" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "Yes" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/369153033/"},{FirmName: "1947 Rise" ,BannerURL: "" ,Geography: "Asia-Pacific" ,Location: "India" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Early (A-B),Pre-seed,Seed" ,PrimaryIndustry: "Generalist" ,IndustryKeywords: "Generalist" ,DiverseGP: "Yes" ,FemaleGP: "No" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/298119545/"},{FirmName: "Incisive Ventures" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Incisive/Incisivelogo.jpeg" ,Geography: "North America" ,Location: "Seattle, WA, USA" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Pre-seed" ,PrimaryIndustry: "Enterprise" ,IndustryKeywords: "FinTech, EdTech, RETech, Insuretech, Health & Fitness" ,DiverseGP: "No" ,FemaleGP: "No" ,UnderrepresentedGP: "No" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/108864115/"},{FirmName: "Supernode Global" ,BannerURL: "https://revereoneimgs.s3.us-west-1.amazonaws.com/Supernode/supernodelogo.png" ,Geography: "Europe" ,Location: "London, UK" ,InvestmentStageFocus: "Pre-Seed / Seed" ,InvestmentStageKeywords: "Seed" ,PrimaryIndustry: "Deep Tech" ,IndustryKeywords: "Deep Tech; Gaming; Platforms; Web3" ,DiverseGP: "No" ,FemaleGP: "Yes" ,UnderrepresentedGP: "Yes" ,Impact: "No" ,VerifiedSnapshot: "https://ratings.reverevc.com/view/916819792/"}];