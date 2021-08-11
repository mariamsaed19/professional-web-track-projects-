/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/*to keep track of section number */
let idOfSection=1;
/* get the parent element 'main' */
const parentMain = document.querySelector('main');
/* get the parent element 'navlist' */
const parentNav = document.querySelector('#navbar__list');
/*go to top btn */
const topBtn = document.querySelector('#goUp');

function AddContent(){
    /* create new section and set its inner html */
    let sec = document.createElement('section');

  sec.innerHTML=`<div class="landing__container">
  <h2>Section ${idOfSection}</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
  <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div>`
    sec.setAttribute('id',`section${idOfSection}`)
    /*append the new section at the end of 'main' tag */
    parentMain.appendChild(sec);
    addToNav();
    idOfSection++; //increment number of sections
}

/*add the new section to nav bar */
function addToNav(){
    let newElm = document.createElement('li');
    newElm.innerHTML=`<li>
        <a class="menu__link" href="#section${idOfSection}" > Section ${idOfSection}</a>
        </li>` /* set innerhtml and link this item with its section */
    parentNav.appendChild(newElm); // append the new section 
}
/*focus on active section */
window.onscroll=function(event){
    // check if we passed the header
   if(document.body.scrollTop>400||document.documentElement.scrollTop > 400){
        topBtn.style.display='block'
    }
    else{
      
        topBtn.style.display='none'; //hide top button when we are on top
    }
    setTimeout(updateActive(), 0); // wait till stop scrolling to become more stable
   
}
/*update active section */
function updateActive(){
    //update active section
    let sections = document.querySelectorAll('section');
    for(let i = 0 ;i<sections.length;i++){
        let bounds = sections[i].getBoundingClientRect() // get bounds of section
        let id =sections[i].getAttribute('id')
        // check if the section is fully or mostly on the screen
        if((bounds.top >= 0 && bounds.bottom <=window.innerHeight)  //full section is on screen
        || (bounds.top <=window.innerHeight && bounds.bottom>=0.65*window.innerHeight) //65% of section is on screen  
        ){
            //add active class to current section
            document.querySelector('.active-state')?.classList.remove('active-state');
            document.querySelector(`#${id}`).classList.add('active-state');
        
            //add active class to current section on nav bar
            document.querySelector('.active-link')?.classList.remove('active-link');
            document.querySelector(`[href="#${id}"]`).classList.add('active-link');

            break; // to avoid loop over unwanted sections 
        }
    
    }
}



/*jump to top */
topBtn.addEventListener('click', function (){
    document.documentElement.scrollTop=0 // go to the top of page
})

/*initialy create 4 sections */
AddContent();AddContent();AddContent();AddContent();