<template>
    <div id="home" class="container">
        <b-row class="mt-4">
            <b-col cols="12">
                <op-searchbox/>
            </b-col>
        </b-row>
        <b-jumbotron class="mt-4">
            <template slot="header">{{ $t('home.jumbotron.header') }}</template>
            <template slot="lead" v-if="$t('home.jumbotron.lead')">{{ $t('home.jumbotron.lead') }}</template>
            <hr class="my-3">
            <p v-if="$t('home.jumbotron.text')">{{ $t('home.jumbotron.text') }}</p>
            <b-button-group class="float-right" size="lg">
                <b-btn variant="secondary" href="http://allitebooks.com" target="blank">
                    {{ $t('home.jumbotron.button.allitebooks') }}
                </b-btn> 
                <b-btn variant="primary" :to="{ name: 'about' }">
                    {{ $t('home.jumbotron.button.more') }}
                </b-btn>
            </b-button-group>
        </b-jumbotron>
        <b-row class="mt-4">
            <b-col sm="12" md="7" lg="8">
                <op-linker/>
                <op-recent class="mt-4"/>
            </b-col>
            <b-col tag="aside" sm="12" md="5" lg="4">
                <op-stats/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Linker from '@/components/common/Linker'
import Searchbox from '@/components/search/Searchbox'

export default {
  name: 'home',

  components: {
      'op-linker': Linker,
      'op-searchbox': Searchbox
  }
}
</script>
