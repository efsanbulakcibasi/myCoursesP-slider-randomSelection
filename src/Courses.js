import { useState } from "react";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";

function Courses({ courses, removeCourse }) {
  //biz öncekinde alt comp'e mapleme işlemiyle hepsini yazdırıyorduk fakat artık sadece tek bir tane üzerinden
  //devam etmemiz gerektiği için mapleme işlemi yerine buradan yazdırıyoruz.
  //idexinden seçeceğimiz için datamızı 0 yani ilkini veriyoruz ilk olarak
  //ilk değerimiz java kursu olduğu için onu bastıracaktır
  const [index, setIndex] = useState(0);
  const { title, content, price } = courses[index];

//direkt setleme işlemi yapıp +1 ve -1 şeklinde verecek olursak ilk elemandan öncesi ve son elemanda kodumuz patlar
//indexin kontrolünü sağlamamız gerekir
  const checkIndex = (index) => {
    if (index<0) {
      //index 0 dan küçük ise yani ilk elemandaysa ve bir öncekine gitmeye çalışıyorsa onu son elemana atmamız gerekir
      //uzunluğundan bir öncekini vermemiz gerekir
      return courses.length -1
    }
    //eğer indeximiz son indexte ise ve ileri gidemez başa döndürmemiz gerekir. sonuncudan büyük olamayacağına göre
    //bir öncekinden büyük olduğu koşulda bunu sağlayabiliriz. 
    if (index > courses.length -1) {
      return 0;
    }
    return index;
  }


  const beforeCourse = () => {
    setIndex((index) =>{
      let newIndex = index -1 
      return checkIndex(newIndex)
    })
  }

  const nextCourses = () => {
    setIndex((index) => {
      let newIndex = index +1
      return checkIndex(newIndex)
    })
  }

//random bir şekilde kurslar arasındna seçmesi isin floorla tam sayı yapıp iki değer arasından seçeceğimiz için 
//veri uzunluğu ile çarpıyoruz. 0 ile kaç değerimiz varsa onun arasından random atama yapacak
  const randomSelect = () => {
    let randomCourse = Math.floor( Math.random() * courses.length)
    //aynı değer iki defa üst üste gelmesi durumunu kontrol edelim

    if (randomCourse===index) {
      randomCourse = index +1;
    }
    setIndex(checkIndex(randomCourse));
  };

  return (
    <>
    <div className="random">
    <button  className="random-btn" onClick={randomSelect}>Kurs ata</button>
    </div>
    <div className="courses" >

      <button onClick={beforeCourse}>
        <FaChevronLeft/>
      </button>
      <div className="course">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="remove-btn">
          <span>Price: {price}</span>
        </div>
      </div>
      <button onClick={nextCourses}>
        <FaChevronRight  />
      </button>
    </div>
    </>
  );
}

export default Courses;
