import React, { useState, useEffect } from "react";
import "../Table/table.css";
import DataGrid, { Scrolling, Pager } from "devextreme-react/data-grid";
import { data2 } from "../../Data/data";
import AddNewAccount from "../Add-New-Account/addNewAccount";


const App = () => {
  const [showNavButtons, setShowNavButtons] = useState(true);
  const [userData, setUserData] = useState(data2);
  const [filteredUserData, setFilteredUserData] = useState(data2);
  const [pageSize, setPageSize] = useState(5);

  const customizeColumns = (columns) => {
    columns.width = 476.66;
  };

  const addAccount = (obj) => {
    setUserData((prev) => [...prev, obj]);
    setFilteredUserData((prev) => [...prev, obj]);
  };

  
//inputları filtreleme yapıyorum. 
  const handleSearch = (value) => {
    if (userData && userData.length > 0) {
      const filteredData = userData.filter((item) => {
        if (item.sosyalMedyaLinki && item.sosyalMedyaAdi && item.acıklama) {
          const linkMatch = item.sosyalMedyaLinki.toString().includes(value);
          const nameMatch = item.sosyalMedyaAdi.toLowerCase().includes(value.toLowerCase());
          const acıklamaMatch = item.acıklama.toLowerCase().includes(value.toLowerCase());
          return linkMatch || nameMatch || acıklamaMatch;
        }
        return false;
      });
      setFilteredUserData(filteredData);
    }
  };
//row sayısını arttırma ve azaltma
  const increasePageSize = () => {
    setPageSize((prevPageSize) => prevPageSize + 1);
  };

  const decreasePageSize = () => {
    setPageSize((prevPageSize) => Math.max(prevPageSize - 1, 1));
  };

 //local storage'a kaydetmiş olduğum kullanıcıyı ve data2'deki kullanıcı verilerini ui'a ekliyorum
  useEffect(() => {
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUserData((prevUserData) => [...prevUserData, ...parsedData]);
      setFilteredUserData((prevFilteredUserData) => [...prevFilteredUserData, ...parsedData]);
    } else {
      setUserData(data2);
      setFilteredUserData(data2);
    }
  }, []);
  
  
  
  return (
    <div>
      <div className="table-Container">
        <div className="table-Search">
          <div className="wrapper">
            <div className="searchBar">
              <input
                id="searchQueryInput"
                type="text"
                placeholder="Search Objects..."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#ffff"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </button>
              <div className="filterButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="11"
                  fill="currentColor"
                  className="bi bi-funnel-fill filterIcon"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="add-account mt-4">
        <AddNewAccount userData={filteredUserData} setUserData={setUserData} setFilteredUserData={setFilteredUserData} />
        </div>
        <DataGrid
          dataSource={filteredUserData.slice(0, pageSize)} // görmek istediğimiz row sayısı kadar inputu ui'ya yansıtıyoruz(pageSize ile)
          customizeColumns={customizeColumns}
          id="dataGrid"
          onCellPrepared={(e) => {
            if (e.column.dataField === e.column.sortIndex) {
              const sortingIcon = e.cellElement.querySelector(".dx-sort");
              if (sortingIcon) {
                sortingIcon.style.color = "purple";
              }
            }
            if (e.rowIndex % 2 === 0) {
              e.cellElement.style.backgroundColor = "#EFF2FF";
              e.cellElement.style.height = "66px";
              e.cellElement.style.paddingLeft = "26px";
              e.cellElement.style.paddingTop = "21px";
            } else {
              e.cellElement.style.backgroundColor = "#FFFF";
              e.cellElement.style.height = "66px";
              e.cellElement.style.paddingLeft = "26px";
              e.cellElement.style.paddingTop = "21px";
            }
          }}
        >
          <Scrolling rowRenderingMode="virtual"></Scrolling>
          <Pager
            visible={true}
            showNavigationButtons={showNavButtons}
            displayMode="compact"
            pageSize={pageSize} //istenilen row sayını pageSize'a set ediyorum.
            onPageSizeChange={setPageSize} //pageSize'ı update ediyorum. 
            
          />
        </DataGrid>
        <br/>
        <br/>
        <div className="page-size-button">
          <div className="insideOfSizeButton">
            {pageSize} Rows 
            <svg
              className="arrow1 bi bi-caret-up-fill"
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="9.97"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={increasePageSize} 
            >
              <path d="m7.247 4.86-4.796 5.481a.422.422 0 0 0-.074.334c.045.15.164.276.336.343a.47.47 0 0 0 .377-.028L8 6.343l4.83 4.647c.153.148.368.194.562.122a.47.47 0 0 0 .28-.313.421.421 0 0 0-.075-.334L8.753 4.861a.495.495 0 0 0-.506-.132.496.496 0 0 0-.506.132z" />
            </svg>
            <svg
              className="arrow2 bi bi-caret-down-fill"
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="9.97"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={decreasePageSize} 
            >
              <path d="m8.753 11.14 4.797-5.48a.422.422 0 0 0 .074-.334c-.045-.15-.164-.276-.336-.343a.47.47 0 0 0-.377.028L8 9.657l-4.83-4.647c-.153-.148-.368-.194-.562-.122a.47.47 0 0 0-.28.313.421.421 0 0 0 .075.334L7.247 11.14a.495.495 0 0 0 .506.132.496.496 0 0 0 .506-.132z" />
            </svg>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default App;
