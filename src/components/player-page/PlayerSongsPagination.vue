<template>
  <div
    class="player-songs-pagination d-flex justify-center mt-3"
  >
    <div class="d-flex justify-space-between player-songs-pagination__controls">
      <base-button
        :is-disabled="!pagination.hasPrevious"
        border-color="white"
        color="transparent"
        is-icon
        @click="getSongs('previous')"
      >
        <span class="material-icons">
          keyboard_arrow_left
        </span>
      </base-button>
      <base-button
        :is-disabled="!pagination.hasNext"
        border-color="white"
        color="transparent"
        is-icon
        @click="getSongs('next')"
      >
        <span class="material-icons">
          keyboard_arrow_right
        </span>
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import { SpotifyTrackListPagination } from "@/models/SpotifyModels";
import player from "@/store/modules/player";

@Component({
  components: {
    BaseButton,
  }
})
export default class PlayerSongsPagination extends Vue {
  get pagination() : SpotifyTrackListPagination {
    return player.pagination;
  }

  getSongs(type: string): void {
    let offset;
    if(type === "next") {
      offset =
          this.pagination.total - this.pagination.offset > 10 ?
            this.pagination.offset + 10 :
            this.pagination.total - this.pagination.offset;
    } else {
      offset =
          this.pagination.offset - 10 >= 0 ?
            this.pagination.offset - 10 :
            0;
    }
    player.getSongsList({
      limit: 10,
      offset
    });
  }
}
</script>

<style lang="scss">
.player-songs-pagination {
  &__controls {
  width: 100px;
  }
}

</style>


