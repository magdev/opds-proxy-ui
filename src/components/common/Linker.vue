<template>
    <div id="opds-linker">
        <b-input-group size="lg" :prepend="$t('linker.opds.link')">
            <b-form-input type="text" id="opdsUrl" readonly v-model="opdsUrl"></b-form-input>
            <b-input-group-append>
                <b-btn variant="secondary" @click.stop="copyUrl">{{ $t('linker.button.copy') }}</b-btn>
            </b-input-group-append>
        </b-input-group>
        <b-tooltip target="opdsUrl" :title="$t('linker.opds.copied')" 
            :show.sync="showTooltip" 
            triggers="none"
            placement="top">
        </b-tooltip>
    </div>
</template>

<script>
import settings from '@/settings'

export default {
    name: 'linker',

    computed: {
        protocol() {
            return window.location.protocol
        },
        hostname() {
            return window.location.host
        },
        opdspath() {
            return settings.APP_OPDS_PATH
        },
        opdsUrl() {
            return this.protocol + '//' + this.hostname + this.opdspath
        }
    },

    data() {
        return {
            showTooltip: false
        }
    },

    methods: {
        copyUrl: function() {
            this.$copyText(this.opdsUrl).then(result => {
                this.showTooltip = true
                setTimeout(() => {
                    this.showTooltip = false
                }, settings.APP_TOOLTIP_TIMEOUT)
            }).catch(e => {
                this.$store.commit('notifications/error', e)
            })
        }
    }
}
</script>
