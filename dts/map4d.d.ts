// Type definitions for map4dsdk 1.0
// Project: https://github.com/iotlinkadmin/map4d-web-sdk (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Sua Le <https://github.com/sua8051>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'map4d' {
  interface CircleOptions {
    center: ILatLng
    radius?: number
    fillColor?: string
    fillOpacity?: number
    visible?: boolean
    strokeColor?: string
    strokeWidth?: number
    draggable?: boolean
    zIndex?: number
    elevation?: number
    userInteractionEnabled?: boolean
  }

  export type MapObjectData = {
    reuseId?: string
    data: string,
  }

  class Circle {
    constructor(options: CircleOptions)
    getMap(): Map
    setMap(map: Map): void
    setCenter(center: ILatLng): void
    setRadius(radius: number): void
    setFillColor(fillColor: string)
    setFillOpacity(fillOpacity: number)
    setStrokeColor(fillColor: string)
    setStrokeWidth(fillOpacity: number)
    setVisible(visible: boolean)
    getCenter(): LatLng
    getRadius(): number
    getFillColor(): string
    getFillOpacity(): number
    getStrokeColor(): string
    getStrokeWidth(): number
    isVisible(): boolean
    setDraggable(draggable: boolean): void
    isDraggable(): boolean
    getElevation(): number
    setElevation(elevation: number): number
    getZIndex(): number
    setZIndex(zIndex: number): void

    getUserData(): any
    setUserData(data: any)

    isUserInteractionEnabled(): boolean
    setUserInteraction(enable: boolean): void
  }

  class Measure {
    constructor(path: ILatLng[])
    setPath(path: ILatLng[]): void
    addPath(path: ILatLng[]): void
    length: number
    perimeter: number
    area: number
    center: LatLng
  }

  class CoordinateTransformer {
    constructor(coordinates: ILatLng[])
    setCoordinates(coordinates: ILatLng[]): void
    addCoordinates(coordinates: ILatLng[]): void
    rotate(degree: number, anchor?: ILatLng): LatLng[]
    translate(target: ILatLng, anchor?: ILatLng): LatLng[]
    scale(scale: number, anchor?: ILatLng): LatLng[]
    center: LatLng
  }

  type ICameraPosition  = CameraPosition | {target?: ILatLng, tilt?: number, bearing?: number, zoom?: number}
  class CameraPosition{
    setTarget(target: ILatLng): void
    setTilt(degrees: number): void
    setBearing(degrees: number): void
    setZoom(zoom: number)
    getTarget(): LatLng
    getTilt(): number
    getBearing(): number
    getZoom(): number
  }

  class Icon {
    constructor(width: number, height: number, url: string)
    clone(): Icon
    getWidth(): number
    getHeight(): number
    getUrl(): string
  }

  type ILatLng  = LatLng | {lat: number, lng: number} | [number, number]
  class LatLng {
    constructor(lat: number, lng: number)
    equals(other: LatLng): boolean
    toString(): string
    normalize(): LatLng
    valid(): boolean

    lat: number
    lng: number
  }

  type ILatLngBounds = LatLngBounds | [ILatLng, ILatLng] | [number, number, number, number]
  class LatLngBounds {
    constructor(sw?: ILatLng, ne?: ILatLng)
    getCenter(): LatLng
    getNortheast(): LatLng
    getSouthwest(): LatLng
    extend(point: ILatLng): LatLngBounds
  }

  enum MapEvent {
    cameraWillChange = 0,
    cameraChanging,
    idle,
    hover,
    click,
    dblClick,
    drag,
    dragEnd,
    dragStart,
    mouseMove,
    mouseOut,
    mouseOver,
    rightClick,
    tilesLoaded,
    modeChanged,
    longClick,
    boundsChanged
  }

  enum ControlOptions {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
  }

  enum Weather {
    Rainy = 0,
    Snowy,
    Sunny,
    Cloudy,
    Live,
    None
  }

  enum TimeEffect{
    Live,
    Morning,
    Noon,
    AfterNoon,
    Evening,
    None
  }

  interface MapOptions {
    center?: ILatLng
    zoom?: number
    minZoom?: number
    maxZoom?: number
    maxNativeZoom?: number,
    geolocate?: boolean
    accessKey?: string
    tilt?: number,
    bearing?: number,
    controls?: boolean
    controlOptions?: ControlOptions
    restrictionBounds?: ILatLngBounds
    shouldChangeMapMode?: Function
  }

  interface AnimationOptions {
    duration?: number
    easing?: (arg0: number) => number
    animate?: boolean
  }

  interface PaddingOptions {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }

  interface EventOptions {

    marker?: boolean

    polygon?: boolean

    polyline?: boolean

    circle?: boolean

    poi?: boolean

    building?: boolean

    location?: boolean

    mappoi?: boolean

    mapbuilding?: boolean
  }

  namespace Data {

    interface Geometry {

      getType(): string

      forEachLatLng(callback: (LatLng) => void): void
    }

    class LineString implements Geometry {

      constructor(elements: ILatLng[])

      forEachLatLng(callback: (LatLng) => void): void

      getType(): string
    }

    class LinearRing {

      constructor(elements: ILatLng[])

      elements: LatLng[]
    }

    class Polygon implements Geometry {

      constructor(element: LinearRing)

      forEachLatLng(callback: (LatLng) => void): void

      getType(): string

    }

    class MultiPolygon implements Geometry {

      constructor(elements: Data.Polygon[])

      forEachLatLng(callback: (LatLng) => void): void

      getAt(n: number): Data.Polygon

      getLength(): number

      getType(): string

    }

    class MultiLineString implements Geometry {

      constructor(elements: Data.LineString[])

      forEachLatLng(callback: (LatLng) => void): void

      getAt(n: number): Data.LineString

      getLength(): number

      getType(): string
    }

    class Feature {

      constructor(id: number | string, geometry: Geometry, properties: any)

      getId(): number | string

      getGeometry(): Geometry

      getProperties(): any

    }


    type FeatureOptions = {

      id : number | string

      geometry: Data.Geometry

      properties?: any
    }

  }

  class MapData {

    addGeoJson(geoJson: string): Data.Feature[]

    add(feature: Data.Feature | Data.FeatureOptions): Data.Feature

    remove(feature: Data.Feature): void

    clear(): void

    addListener(event: string | MapEvent, func: Function): MapsEventListener

    setMinZoom(minZoom: number): void

    setMaxZoom(maxZoom: number): void

    getMinZoom(): number

    getMaxZoom(): number
  }


  class Map {
    constructor(container: HTMLElement, options?: MapOptions)

     data: MapData

    enable3dMode(enabled: boolean): void

    getBounds(paddingOptions?: PaddingOptions): LatLngBounds

    setTileUrl(mapUrl: string, is3dMode: boolean): void
    getTileUrl(is3dMode: boolean): string

    setMinZoom(minZoom: number): void
    setMaxZoom(maxZoom: number): void

    setWeather(weather: string | Weather): void
    getWeather(): Weather

    panBy(offset: IPoint, animationOptions?: AnimationOptions): void
    panTo(latLng: ILatLng, animationOptions?: AnimationOptions): void

    moveToMyLocation(animate: boolean): void
    moveCamera(position: ICameraPosition, animationOptions?: AnimationOptions): void
    getCamera(): CameraPosition
    getCameraWithBounds(bounds: ILatLngBounds, padding?: PaddingOptions): CameraPosition

    getRestrictionBounds(): LatLngBounds
    setRestrictionBounds(bounds: ILatLngBounds): void

    fitBounds(bounds: ILatLngBounds, padding?: PaddingOptions, animationOptions?: AnimationOptions): void

    addListener(event: string | MapEvent, func: Function, options?: EventOptions): MapsEventListener
    setDate(date: Date): void

    is3dMode(): boolean

    getMinZoom(): number
    getPreferMinZoom(): number
    getMaxZoom(): number
    setMaxNativeZoom(maxNativeZoom: number): void
    getMaxNativeZoom(): number

    getTimeEffect(): number
    setTimeEffect(timeEffect: string | TimeEffect): void
    setShadowEffect(enabled: boolean): void

    setBuildingsEnabled(enabled: boolean): void
    isBuildingsEnabled(): boolean
    setPOIsEnabled(enabled: boolean): void
    isPOIsEnabled(): boolean
    setFilterPOIs(poiTypes: string[]): void
    getFilterPOIs(): string[]
    setFilterBuildings(buildingTypes: string[]): void
    getFilterBuildings(): string[]
    setWaterEffect(enabled: boolean): void

    setSelectedBuildings(ids: string[]): void
    getSelectedBuildings(): string[]
    setHiddenBuilding(id: string): void
    setUnhiddenBuilding(id: string): void

    setZoomGesturesEnabled(value: boolean): void
    setScrollGesturesEnabled(value: boolean): void
    setRotateGesturesEnabled(value: boolean): void
    setTiltGesturesEnabled(value: boolean): void
    setAllGesturesEnabled(enabled: boolean): void
  }

  interface MapsEventListener {
    remove(): void
    updateEventOptions(options: EventOptions): void
  }

  interface MarkerOptions {
    position: ILatLng
    visible?: boolean
    anchor?: IPoint
    labelAnchor?: IPoint
    icon?: Icon | string
    elevation?: number
    rotation?: number
    title?: string
    snippet?: string
    windowAnchor?: IPoint
    zIndex?: number
    label?: string | MarkerLabel
    draggable?: boolean
    iconView?: string | Node

    userInteractionEnabled?: boolean
  }

  interface MarginOptions {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  }

  interface MarkerLabelOptions {
    text: string
    color?: string
    fontWeight?: string
    fontSize?: number
    maxWidth?: number
    line?: number
    halo?: boolean
    haloColor?: string
    anchor?: IPoint,
    margin?: MarginOptions
  }

  class Marker {
    constructor(options: MarkerOptions)
    setMap(map: Map)
    setPosition(position: ILatLng)
    setVisible(visible: boolean)
    setAnchor(anchor: IPoint)
    setLabelAnchor(labelAnchor: IPoint): void
    setIcon(icon: Icon | string)
    setElevation(elevation: number)
    setRotation(rotation: number): void
    setZIndex(zIndex: number): void
    getZIndex(): number
    getPosition(): LatLng
    isVisible(): boolean
    getAnchor(): Point
    getLabelAnchor(): Point
    getIcon(): Icon | string
    getElevation(): number
    getRotation(): number
    getMap(): Map
    hideInfoWindow(): void
    showInfoWindow(): void
    getTitle(): string
    setTitle(title: string): void
    getSnippet(): string
    setSnippet(snippet: string): void
    setWindowAnchor(anchor: IPoint): void
    setInfoWindow(infoWindow: string | Node): void
    setInfoContents(infoContents: string | Node): void
    isInfoWindowShown(): boolean
    setDraggable(draggable: boolean): void
    isDraggable(): boolean

    getUserData(): any
    setUserData(data: any)
    setLabel(label: string | MarkerLabel): void
    setIconView(iconView: string | Node ): void
    getIconView():  string | Node
    isUserInteractionEnabled(): boolean
    setUserInteraction(enable: boolean): void
  }

  class MarkerLabel {
    constructor(options: MarkerLabelOptions)
    getColor(): string
    getFontWeight(): string
    getFontSize(): number
    getText(): string
    hasHalo(): boolean
    getHaloColor(): string
    getAnchor(): Point
    getMargin(): MarginOptions
  }

  type IPoint  = Point | {x: number, y: number} | [number, number]
  class Point {
    x: number
    y: number
    constructor(x: number, y: number)
    equals(other: Point): boolean
    toString(): string
  }

  interface PolygonOptions {
    paths: ILatLng[][]
    fillColor?: string
    fillOpacity?: number
    visible?: boolean
    strokeColor?: string
    strokeWidth?: number
    draggable?: boolean
    zIndex?: number
    elevation?: number

    userInteractionEnabled?: boolean
  }

  class Polygon {
    constructor(options: PolygonOptions)
    getMap(): Map
    setMap(map: Map): void
    setPaths(paths: ILatLng[][]): void
    setFillColor(fillColor: string): void
    setFillOpacity(fillOpacity: number): void
    setStrokeColor(strokeColor: string): void
    setStrokeWidth(strokeWidth: number): void
    setVisible(visible: boolean): void
    getPaths(): LatLng[][]
    getFillColor(): string
    getFillOpacity(): number
    getStrokeColor(): string
    getStrokeWidth(): number
    isVisible(): boolean
    setDraggable(isDraggable: boolean): void
    isDraggable(): boolean
    getZIndex(): number
    setZIndex(zIndex: number): void
    getElevation(): number
    setElevation(elevation: number): void

    getUserData(): any
    setUserData(data: any): void

    isUserInteractionEnabled(): boolean
    setUserInteraction(enable: boolean): void
  }

  interface PolylineOptions {
    path: ILatLng[]
    strokeWidth?: number
    strokeColor?: string
    strokeOpacity?: number
    visible?: boolean
    closed?: boolean
    draggable?: boolean
    zIndex?: number
    elevation?: number
    style?: string

    userInteractionEnabled?: boolean
  }

  class Polyline {
    constructor(options: PolylineOptions)
    getPath(): LatLng[]
    getMap(): Map
    setMap(map: Map): void
    setPath(path: ILatLng[]): void
    setStrokeWidth(strokeWidth: number): void
    setClosed(closed: boolean): void
    setStrokeColor(strokeColor: string): void
    setStrokeOpacity(strokeOpacity: number): void
    setVisible(visible: boolean): void
    setStyle(style: string): void
    getStrokeWidth(): number
    getStrokeColor(): string
    getStrokeOpacity(): number
    isVisible(): boolean
    isClosed(): boolean
    getZIndex(): boolean
    setZIndex(zIndex: number): void
    getElevation(): number
    setElevation(elevation: number): number
    getStyle(): string
    getUserData(): any
    setUserData(data: any): void
    isDraggable(): boolean
    setDraggable(value: boolean): void
    isUserInteractionEnabled(): boolean
    setUserInteraction(enable: boolean): void
  }

  class Projection {
    constructor(map: Map)
    fromLatLngToScreen(latLng: LatLng, elevation?: number): Point
    fromScreenToLatLng(screenCoordinate: IPoint, elevation?: number): LatLng
  }

  interface MarkerClusterOptions {
    minZoom?: number
    maxZoom?: number
    radius?: number
    zoomOnClick?: boolean
  }

  class MarkerClusterer {
    constructor(markers: Marker[], options?: MarkerClusterOptions)
    setZoomOnClick(zoomOnClick: boolean): void
    setMap(map: Map): void
  }

  interface POIOptions {
    position: ILatLng
    title?: string
    subtitle?: string
    titleColor?: string
    type?: string
    icon?: string
    elevation?: number
    zIndex?: number
    visible?: boolean
    draggable?: boolean
    userInteractionEnabled?: boolean
  }

  class POI {
    constructor(options: POIOptions)
    setMap(map: Map): void
    getMap(): Map
    getTitle(): string
    setTitle(value: string): void
    getPosition(): LatLng
    setPosition(value: ILatLng): void
    getTitleColor(): string
    setTitleColor(value: string): void
    getSubtitle(): string
    setSubtitle(value: string): void
    getType(): string
    setType(value: string): void
    getIcon(): string
    setIcon(icon: string): void
    isVisible(): boolean
    setVisible(value: boolean): void
    isDraggable(): boolean
    setDraggable(value: boolean): void
    getZIndex(): number
    setZIndex(zIndex: number): void
    getElevation(): number
    setElevation(elevation: number): void
    getUserData(): any
    setUserData(data: any): void
    isUserInteractionEnabled(): boolean
    setUserInteraction(enable: boolean): void
  }

  interface BuildingOptions {
    position?: ILatLng
    name?: string
    scale?: number
    bearing?: number
    elevation?: number
    height?: number
    model?:  string
    texture?: string
    coordinates?: ILatLng[]
    zIndex?: number
    visible?: boolean
    draggable?: boolean
    userInteractionEnabled?: boolean
    selected?: boolean
    growUp?: boolean
  }

  class Building {
    constructor(options: BuildingOptions)
    setMap(map: Map): void
    getMap(): Map
    getPosition(): LatLng
    setPosition(position: ILatLng): void
    getName(): string
    setName(name: string): void
    getBearing(): number
    setBearing(bearing: number): void
    getScale(): number
    setScale(scale: number): void
    getHeight(): number
    setHeight(height: number): void
    getElevation(): number
    setElevation(elevation: number): void
    isSelected(): boolean
    setSelected(selected: boolean): void
    setModel(model: string): void
    setCoordinates(values: ILatLng[]): void
    setTexture(texture: string): void
    isVisible(): boolean
    setVisible(visible: boolean): void
    isGrowUp(): boolean
    setGrowUp(value: boolean): void
    isDraggable(): boolean
    setDraggable(value: boolean): void
    getZIndex(): number
    setZIndex(zIndex: number): void
    getUserData(): any
    setUserData(data: any): void
    isUserInteractionEnabled(): boolean
    setUserInteraction(enable: boolean): void
    getTileCovers(zooms: number[], completion: Function): void
    getBoundsCoordinates(completion: Function): void
  }

  interface TileOverlayOptions {
    getUrl: Function
    visible?: boolean
    zIndex?: number
  }

  class TileOverlay {
    constructor(options?: TileOverlayOptions)
    setMap(map: Map): void
    setVisible(visibility: boolean): void
    isVisible(): boolean
    setZIndex(zIndex: number): void
    getZIndex(): number
  }

  interface GroundOverlayOptions {
    getUrl: Function
    bounds: ILatLngBounds
    override?: boolean
    visible?: boolean
    zIndex?: number
  }

  class GroundOverlay {
    constructor(options: GroundOverlayOptions)
    setMap(map: Map): void
    setVisible(visibility: boolean): void
    isVisible(): boolean
    setZIndex(zIndex: number): void
    getZIndex(): number
  }

  interface POIData {
    id: string
    position: ILatLng
    title: string
    titleColor?: string
    type?: string
    icon?: string
    zIndex?: number
  }

  interface POIOverlayOptions {
    getUrl: Function
    parserData: Function
    prefixId? :string
    visible?: boolean
  }

  class POIOverlay {
    constructor(options: POIOverlayOptions)
    setMap(map: Map): void
    setVisible(visibility: boolean): void
    isVisible(): boolean
    getPrefixId(): string
  }

  interface BuildingData {
    id: string
    name: string
    position: ILatLng
    scale?: number
    bearing?: number
    elevation?: number
    height?: number
    model?: string
    texture?: string
    coordinates?: ILatLng[]
    startDate?: number
    endDate?: number
  }

  interface BuildingOverlayOptions {
    getUrl: Function
    parserData: Function
    prefixId? :string
    visible?: boolean
  }

  class BuildingOverlay {
    constructor(options?: BuildingOverlayOptions)
    setMap(map: Map): void
    setVisible(visibility: boolean): void
    isVisible(): boolean
    getPrefixId(): string
  }
}
