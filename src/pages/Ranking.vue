<script lang="ts" setup>
import  Header  from "@/components/Header.vue";
import { RankingInfo } from "@/type/ranking/index"
import useGetRank from "@/hooks/ranking/useGetRank"
import { ref } from "vue";

let rankingInfo1 :RankingInfo = {
  pageNum: 1,
  pageSize: 10,
  navSize: 1,
  order:0,
}
let rankingInfo2 :RankingInfo = {
  pageNum: 1,
  pageSize: 10,
  navSize: 3,
  order:1,
}

const {data:data1, fetching:fetching1, error:error1, query:query1} = useGetRank();
const {data:data2, fetching:fetching2, error:error2, query:query2} = useGetRank();

query1(rankingInfo1);
query2(rankingInfo2);


const currentPage = ref<number>(1);
  async function choose() {
  rankingInfo2.pageNum = currentPage.value;
  query2(rankingInfo2);
}



</script>

<template>
  <div class="container">
    <div class="header">
      <Header/>
    </div>
    <div class="main" v-if="!error1 && !fetching1 && !error2 && !fetching2">
      <div class="left">
        <div class="title">通过率排行榜</div>
        <div class="top">
          <div class="first">
            <el-avatar :src="data1.list[0].avatar"/>
            <div class="word">
              <div>{{ data1.list[0].name}}</div>
              <div>{{ data1.list[0].acRate }}%</div>
            </div>
          </div>
          <div class="two">
            <div class="second">
              <el-avatar :src="data1.list[1].avatar"/>
              <div class="word">
              <div>{{ data1.list[1].name}}</div>
              <div>{{ data1.list[1].acRate }}%</div>
            </div>
            </div>
            <div class="third">
              <el-avatar :src="data1.list[2].avatar"/>
              <div class="word">
              <div>{{ data1.list[2].name}}</div>
              <div>{{ data1.list[2].acRate }}%</div>
            </div>
            </div>
          </div>
          <div class="rate">
            <div class="all" v-for=" (ranking,index) in data1.list.slice(3)">
              <div class="order">
                <p>{{ index + 4 }}</p>
              </div>
              <div class="person">
                <el-avatar :src="ranking.avatar" />
                <div class="msg">
                  <p class="name">{{ ranking.name }}</p>
                  <p class="count">已通过题目{{ ranking.acNum }}道</p>
                </div>
              </div>
              <div class="pass">
                <p>{{ ranking.acRate }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="content">
          <div>通过率</div>
          <div>提交次数</div>
          <div>通过次数</div>
        </div>
        <div class="passAll" v-for="(rank,index) in data2.list">
          <div class="orderNum">
              <p>{{ index + 1 }}</p>
          </div>
          <div class="people">
            <el-avatar :src="rank.avatar" :class="{box1: index === 0,box2: index === 1,box3: index === 2}"/>
              <div class="msgAll">
                <p>{{ rank.name }}</p>
              </div>
          </div>
          <div class="data">
            <div class="acRate">{{ rank.acRate }}%</div>
            <div class="submitNum">{{ rank.submitNum }}</div>
            <div class="acNum">{{ rank.acNum }}</div>
          </div>
        </div>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="data2.total"
          :pager-count="rankingInfo2.navSize"
          :page-size="rankingInfo2.pageSize"
          v-model:current-page="currentPage"
          @current-change="choose"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  background-color: rgb(250,250,250);
}
.main{
    margin: 0 auto;
    width: 60%;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
  }
  .left{
    width: 40%;
    margin-right: 5%;
  }
  .title{
    text-align: center;
    padding: 5vh;
    padding-top: 2vh;
    color: rgb(185,191,195);
    font-size: 25px;
    font-weight: 600;
  }
  .top{
    height: 300px;
  }
  .first{
    text-align: center;
    position: relative;
    height: 15vh;
    .el-avatar{
      width: 70px;
      height: 70px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.02),0px 2px 10px rgba(0, 0, 0, 0.04), 0px 2px 10px rgba(0, 0, 0, 0.02),
        0px 2px 10px rgba(0, 0, 0, 0.02);
      border:5px solid rgb(238,208,16);
        &:hover{
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.02),0px 4px 15px rgba(0, 0, 0, 0.04), 0px 4px 15px rgba(0, 0, 0, 0.02),
        0px 4px 15px rgba(0, 0, 0, 0.02);
        transition: all .3s;
      }
    }
    .word{
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      top:-20%;
      z-index: 999px;
      background-color: rgb(253,253,253);
      border-radius: 10px;
      box-shadow: 0 5px 15px 0 rgba(0,0,0,0.08);
      opacity: .9;
    }
  }
  .two{
    display: flex;
    text-align: center;
    .second{
      position: relative;
      width: 50%;
      margin: 10px 0;
      height: 15vh;
      .word{
        width: fit-content;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top:-20%;
        z-index: 999px;
        background-color: rgb(253,253,253);
        border-radius: 10px;
        box-shadow: 0 5px 15px 0 rgba(0,0,0,0.08);
        opacity: .9;
      }
      .el-avatar{
        border:5px solid rgb(212,212,212);
      }
    }
    .third{
      position: relative;
      width: 50%;
      margin: 10px 0;
      height: 15vh;
      .word{
        position: absolute;
        top: 55%;
        left: 40%;
        z-index: 999px;
        background-color: rgb(253,253,253);
        border-radius: 10px;
        box-shadow: 0 5px 15px 0 rgba(0,0,0,0.08);
        opacity: .9;
      }
      .el-avatar{
        border:5px solid rgb(233,170,120);
      }
    }
    
    .el-avatar{
      width: 70px;
      height: 70px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.02),0px 2px 10px rgba(0, 0, 0, 0.04), 0px 2px 10px rgba(0, 0, 0, 0.02),
        0px 2px 10px rgba(0, 0, 0, 0.02);
      &:hover{
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.02),0px 4px 15px rgba(0, 0, 0, 0.04), 0px 4px 15px rgba(0, 0, 0, 0.02),
        0px 4px 15px rgba(0, 0, 0, 0.02);
        transition: all .3s;
      }
    }
  }
  .rate{
    height: 65vh;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.02),0px 6px 30px rgba(0, 0, 0, 0.04), 0px 6px 30px rgba(0, 0, 0, 0.02),
    0px 6px 30px rgba(0, 0, 0, 0.02);
    &:hover{
      box-shadow: 0px 6px 40px rgba(0, 0, 0, 0.05),0px 6px 40px rgba(0, 0, 0, 0.08), 0px 6px 40px rgba(0, 0, 0, 0.05),
    0px 6px 40px rgba(0, 0, 0, 0.08);
    transition: all .3s;
    }
  }
  .all{
    position: relative;
    border-bottom: 1px solid rgb(240, 240, 240);
    padding: 10px;
    display: flex;
  }
  .order{
    width: 4vh;
    padding: 1vh;
    padding-top: 1.5vh;
    font-size: 14px;
    color: rgb(128,128,128);
  }
  .person{
    display: flex;
    .el-avatar{
      margin-right: 2vh;
    }
    .name{
      padding-top: .5vh;
      color: rgb(255, 161, 22);
      font-size: 14px;
      margin-bottom: 0.3vh;
    }
    .count{
      color: rgb(128,128,128);
      font-size: 12px;
    }
  }
  .msg{
    display: flex;
    flex-flow: column;
  }
  .pass{
    font-size: 14px;
    color: rgb(128,128,128);
    position: absolute;
    right: 2vh;
    padding: 1vh;
    padding-top: 1.5vh;
    text-align: center;
  }

  .right{
    background-color: white;
    width: 55%;
    height: 112vh;
    border-radius: 20px;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.02),0px 6px 30px rgba(0, 0, 0, 0.04), 0px 6px 30px rgba(0, 0, 0, 0.02),
    0px 6px 30px rgba(0, 0, 0, 0.02);
    &:hover{
      box-shadow: 0px 6px 40px rgba(0, 0, 0, 0.05),0px 6px 40px rgba(0, 0, 0, 0.08), 0px 6px 40px rgba(0, 0, 0, 0.05),
    0px 6px 40px rgba(0, 0, 0, 0.08);
    transition: all .3s;
    }
    .content{
      padding: 20px;
      border-bottom: 1px solid rgb(240, 240, 240);
      display: flex;
      font-size: 14px;
      font-weight: 520;
      text-align: right;
      div{
        &:nth-child(1){
          margin-left: 26.5vh;
        }
        width: 13.5vh;
      }
    }
    .passAll{
      display: flex;
      padding: 10px;
      border-bottom: 1px solid rgb(240, 240, 240);
    }
    .orderNum{
      width: 4vh;
      padding: 1vh;
      padding-top: 1.5vh;
      font-size: 14px;
      color: rgb(128,128,128);
    }
    .people{
      display: flex;
      margin-right: 5vh;
      .el-avatar{
        margin-right: 1vh;
      }
      .msgAll{
        width: 12.5vh;
        padding: 1vh;
        padding-top: 1.5vh;
        padding-right: 0;
        color: rgb(255, 161, 22);
        font-size: 16px;
        margin-bottom: 0.3vh;
      }
    }
    .data{
      display: flex;
      padding: 1vh;
      padding-top: 1.5vh;
      text-align: right;
      .acRate{
        font-size: 14px;
        color: rgb(128,128,128);
        width: 6vh;
      }
      .submitNum{
        font-size: 14px;
        color: rgb(128,128,128);
        width: 12vh;
      }
      .acNum{
        font-size: 14px;
        color: rgb(128,128,128);
        width: 12vh;
      }
    }
    .el-pagination{
      position: absolute;
      top: 120%;
      right: 22%;
    }
    .box1{
      border:3px solid rgb(238,208,16);
    }
    .box2{
      border:3px solid rgb(212,212,212);
    }
    .box3{
      border:3px solid rgb(233,170,120);
    }
  }
</style>