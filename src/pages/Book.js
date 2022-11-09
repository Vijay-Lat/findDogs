import React from "react";
import './Book.css'

const Book = () => {
    var pages = document.getElementsByClassName('page');
  for(var i = 0; i < pages.length; i++)
    {
      var page = pages[i];
      if (i % 2 === 0)
        {
          page.style.zIndex = (pages.length - i);
        }
    }

  document.addEventListener('DOMContentLoaded', function(){
    for(var i = 0; i < pages.length; i++)
      {
        //Or var page = pages[i];
        pages[i].pageNum = i + 1;
        pages[i].onclick=function()
          {
            if (this.pageNum % 2 === 0)
              {
                this.classNameList.remove('flipped');
                this.previousElementSibling.classNameList.remove('flipped');
              }
            else
              {
                this.classNameList.add('flipped');
                this.nextElementSibling.classNameList.add('flipped');
              }
           }
        }
  })
  return (
    <div className="book">
      <div id="pages" className="pages">
        <div className="page">
          <p>
            Open Me, <br />
            please!
          </p>
        </div>
        <div className="page"></div>
        <div className="page">
          <p>Hello there!</p>
        </div>
        <div className="page"></div>
        <div className="page"></div>
        <div className="page"></div>
      </div>
    </div>
  );
};

export default Book;
