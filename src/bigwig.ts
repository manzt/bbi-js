import { BlockView } from './block-view'
import { BBI, RequestOptions } from './bbi'

export class BigWig extends BBI {
  /**
   * Retrieves a BlockView of a specific zoomLevel
   *
   * @param scale - number
   *
   * @param opts - An object containing basesPerSpan (e.g. pixels per basepair)
   * or scale used to infer the zoomLevel to use
   */
  protected async getView(scale: number, opts: RequestOptions) {
    const { zoomLevels, refsByName, isBigEndian, uncompressBufSize } =
      await this.getHeader(opts)
    const basesPerPx = 1 / scale
    const maxLevel = zoomLevels.length - 1

    for (let i = maxLevel; i >= 0; i -= 1) {
      const zh = zoomLevels[i]
      if (zh && zh.reductionLevel <= 2 * basesPerPx) {
        return new BlockView(
          this.bbi,
          refsByName,
          zh.indexOffset,
          isBigEndian,
          uncompressBufSize > 0,
          'summary',
        )
      }
    }
    return this.getUnzoomedView(opts)
  }
}
