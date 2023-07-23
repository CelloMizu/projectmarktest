<template>
  <q-layout>
    <q-page-container class="background flex-cente justify-center">
      <div class="row">
        <div class="col-1">
          <img
            class="logo"
            src="~assets/logo.png"
            alt="Logo"
          />
        </div>
        <div class="col leftbutton" >
          <q-btn label="1"  class="buttonpressed" />
          Sales Pipeline Settings
        </div>
        <div class="spacearound">
        </div>
        <div class="col rightbutton">
          <q-btn label="2" class="buttonfree" />
          Opportunity Detail Settings
        </div>
        <div class="col-1">
          <q-btn rounded class="next q-ml-lg " no-caps label="Next" />
        </div>
        <div class="col-12 row boxcards">
          <div class="displaycards ">
            <p class="title">Please select the type of sales pipeline that best fits to you company</p>
            <div class="row justify-center">
              <div class="col-3"></div>
              <div class=" col q-mx-xs" id="Basic" :class="Basic == true ? 'box' : 'nobox'">
                <q-checkbox v-model="Basic" style="width:15em" class="q-my-xs" @input="changecolumns('Basic')" label="Basic" size="25px" color="blue" />
              </div>
              <div class=" col q-mx-xs" id="Advanced" :class="Advanced == true ? 'box' : 'nobox'">
                <q-checkbox v-model="Advanced" style="width:15em" class="q-my-xs" @input="changecolumns('Advanced')" label="Advanced" size="25px" color="blue"/>
              </div>
              <div class=" col q-mx-xs" id="Expert" :class="Expert == true ? 'box' : 'nobox'">
                <q-checkbox v-model="Expert" style="width:15em" class="q-my-xs" @input="changecolumns('Expert')" label="Expert" size="25px" color="blue"/>
              </div>
              <div class=" col q-mx-xs" id="Custom" :class="Custom == true ? 'box' : 'nobox'">
                <q-checkbox v-model="Custom" style="width:15em" class="q-my-xs" @input="changecolumns('Custom')" label="Custom" size="25px" color="blue"/>
              </div>
              <div class="col-3"></div>
            </div>
            <br>
            <div class="row gap-2 justify-center">
              <div class="card" v-for="(column,index) in FilterColumns" :key="index">
                <q-card dark bordered :class="column.classbase">
                  <q-card-section>
                    <div class=" text-weight-bold text-left	q-mb-sm">{{column.name}}</div>
                    <div :class="column.color">
                      <div :class="column.colorinside">
                        &nbsp;
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="cardspace">
                        <div class="cardinside">
                        </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              
            </div>


          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script src="./base.js" />
<style lang="stylus" src="./base.styl" />
