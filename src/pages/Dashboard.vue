<template>
  <div class="dashboard-contents">
    <div class="row">
      <div class="col-12">
        <card>
          <h5 slot="header" class="title">Excel File Upload</h5>
          <p>학사정보시스템 - 좌측 수업/성적 메뉴 - 성적 및 강의평가 - 기이수성적조회 - 성적엑셀다운로드</p>

          <base-button class="upload-btn" slot="footer" type="primary" fill>
            Upload
            <input type="file" @change="uploadFile" accept="application/vnd.ms-excel" />
          </base-button>
        </card>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <card>
          <h5 slot="header" class="title">Graduate Requirement</h5>

          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="교양필수(중핵필수)" v-model="requirementCredit.liberal_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="교양선택1(중핵필수선택)" v-model="requirementCredit.liberal_S1"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공기초교양" v-model="requirementCredit.liberal_B"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="전공필수" v-model="requirementCredit.major_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공선택" v-model="requirementCredit.major_S"></base-input>
            </div>
          </div>
          <!-- <base-button slot="footer" type="primary" fill>Button</base-button> -->
        </card>
      </div>
      <div class="col-6">
        <card>
          <h5 slot="header" class="title">My Credit</h5>

          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="교양필수(중핵필수)" v-model="myData.liberal_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="교양선택1(중핵필수선택)" v-model="myData.liberal_S1"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공기초교양" v-model="myData.liberal_B"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-md-1">
              <base-input label="전공필수" v-model="myData.major_E"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="전공선택" v-model="myData.major_S"></base-input>
            </div>
            <div class="col-md-4 px-md-1">
              <base-input label="교양선택2(자유교양)" v-model="myData.liberal_S2"></base-input>
            </div>
          </div>
          <!-- <base-button slot="footer" type="primary" fill>Button</base-button> -->
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { parse } from "querystring";

export default {
  mounted() {
    this.setRequrmentCredit("컴퓨터공학과");
  },
  data() {
    return {
      classList: [],
      myData: {
        liberal_E: 0,
        liberal_S1: 0,
        liberal_S2: 0,
        liberal_B: 0,
        major_E: 0,
        major_S: 0,
      },
      majorList: [
        {
          label: "컴퓨터공학과",
          liberal_E: 11,
          liberal_S1: 15,
          liberal_S2: 0,
          liberal_B: 12,
          major_E: 27,
          major_S: 25,
        },
      ],
      requirementCredit: {
        total: 130,
        liberal_E: 0,
        liberal_S1: 0,
        liberal_S2: 0,
        liberal_B: 0,
        major_E: 0,
        major_S: 0,
      },
    };
  },
  methods: {
    setRequrmentCredit(major) {
      let majorData = this.majorList.find((m) => m.label == major);
      this.requirementCredit.liberal_E = majorData.liberal_E;
      this.requirementCredit.liberal_S1 = majorData.liberal_S1;
      this.requirementCredit.liberal_S2 = majorData.liberal_S2;
      this.requirementCredit.liberal_B = majorData.liberal_B;
      this.requirementCredit.major_E = majorData.major_E;
      this.requirementCredit.major_S = majorData.major_S;
    },
    uploadFile(event) {
      let input = event.target;
      let reader = new FileReader();
      let vue = this;
      reader.onload = () => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach(function (sheetName) {
          let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          vue.setData(rowObj);
        });
      };
      reader.readAsBinaryString(input.files[0]);
    },
    setData(data) {
      console.log(data);
      data.forEach((r) => {
        this.classList.push(r);
        /*
        myData: {
        liberal_E: 0,
        liberal_S1: 0,
        liberal_S2: 0,
        liberal_B: 0,
        major_E: 0,
        major_S: 0,
      }, */
        let credit = parseInt(r["학점"]);
        switch (r["이수구분"]) {
          case "교필":
            this.myData.liberal_E += credit;
            break;
          case "교선1":
            this.myData.liberal_S1 += credit;
            break;

          case "교선2":
            this.myData.liberal_S2 += credit;
            break;

          case "기교":
            this.myData.liberal_B += credit;
            break;

          case "전필":
            this.myData.major_E += credit;
            break;

          case "전선":
            this.myData.major_S += credit;
            break;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.upload-btn {
  overflow: hidden;
  input {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
}
</style>
