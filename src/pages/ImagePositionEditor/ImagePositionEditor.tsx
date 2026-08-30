import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getImageAdjustment,
  IMAGE_OFFSET_LIMIT,
  readImageAdjustments,
  resetAllImageAdjustments,
  resetImageAdjustment,
  saveImageAdjustment,
  type ImageAdjustment,
  type ImageAdjustmentContext,
} from '@/data/imageAdjustments';
import { timelineStillGalleries, timelineStillPositions } from '@/data/timelineStills';
import { timelineWorks } from '@/data/timelineWorks';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './ImagePositionEditor.css';

interface DragState {
  pointerX: number;
  pointerY: number;
  adjustment: ImageAdjustment;
}

const TIMELINE_IMAGE_RATIO = 1.66;

function parseImagePosition(position = '50% 50%') {
  const [x = '50%', y = '50%'] = position.split(/\s+/);
  return { x: Number.parseFloat(x), y: Number.parseFloat(y) };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ImagePositionEditor() {
  useDocumentTitle('剧照位置调整工具');
  const [workId, setWorkId] = useState(timelineWorks[0].id);
  const [imageIndex, setImageIndex] = useState(0);
  const [context, setContext] = useState<ImageAdjustmentContext>('timeline');
  const [savedCount, setSavedCount] = useState(() => Object.keys(readImageAdjustments()).length);
  const [viewportRatio, setViewportRatio] = useState(() =>
    typeof window === 'undefined' ? 16 / 9 : window.innerWidth / window.innerHeight,
  );
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const work = timelineWorks.find((item) => item.id === workId) ?? timelineWorks[0];
  const images = timelineStillGalleries[work.id] ?? [];
  const isPortraitDetail = context === 'detail' && imageRatio < 1;
  const detailFitByWidth = !isPortraitDetail && imageRatio <= viewportRatio;
  const detailBaseLeft = isPortraitDetail ? (imageRatio / viewportRatio) * 50 : 50;
  const timelineFitByWidth = imageRatio <= TIMELINE_IMAGE_RATIO;
  const timelinePosition = parseImagePosition(timelineStillPositions[work.id]);
  const timelineBaseLeft = timelineFitByWidth
    ? 50
    : 50 + (imageRatio / TIMELINE_IMAGE_RATIO - 1) * (50 - timelinePosition.x);
  const timelineBaseTop = timelineFitByWidth
    ? 50 + (TIMELINE_IMAGE_RATIO / imageRatio - 1) * (50 - timelinePosition.y)
    : 50;
  const [adjustment, setAdjustment] = useState<ImageAdjustment>(() =>
    getImageAdjustment(work.id, imageIndex, context),
  );
  useEffect(() => {
    setAdjustment(getImageAdjustment(work.id, imageIndex, context));
  }, [context, imageIndex, work.id]);

  useEffect(() => {
    const updateViewportRatio = () => setViewportRatio(window.innerWidth / window.innerHeight);
    window.addEventListener('resize', updateViewportRatio);
    return () => window.removeEventListener('resize', updateViewportRatio);
  }, []);

  function updateAdjustment(next: ImageAdjustment) {
    const normalized = {
      offsetX: clamp(next.offsetX, -IMAGE_OFFSET_LIMIT, IMAGE_OFFSET_LIMIT),
      offsetY: clamp(next.offsetY, -IMAGE_OFFSET_LIMIT, IMAGE_OFFSET_LIMIT),
      scale: clamp(next.scale, 1, 1.5),
    };
    setAdjustment(normalized);
    saveImageAdjustment(work.id, imageIndex, context, normalized);
    setSavedCount(Object.keys(readImageAdjustments()).length);
  }

  function updateScale(scale: number) {
    updateAdjustment({ ...adjustment, scale });
  }

  function selectContext(nextContext: ImageAdjustmentContext) {
    setContext(nextContext);
    if (nextContext === 'timeline') setImageIndex(0);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      adjustment,
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const preview = previewRef.current;
    if (!drag || !preview) return;
    const bounds = preview.getBoundingClientRect();
    updateAdjustment({
      ...adjustment,
      offsetX: drag.adjustment.offsetX + ((event.clientX - drag.pointerX) / bounds.width) * 100,
      offsetY: drag.adjustment.offsetY + ((event.clientY - drag.pointerY) / bounds.height) * 100,
      scale: drag.adjustment.scale,
    });
  }

  function handlePointerUp() {
    dragRef.current = null;
  }

  function handleResetCurrent() {
    resetImageAdjustment(work.id, imageIndex, context);
    setAdjustment(getImageAdjustment(work.id, imageIndex, context));
    setSavedCount(Object.keys(readImageAdjustments()).length);
  }

  function handleResetAll() {
    if (!window.confirm('确定要清除当前浏览器中的追加调整吗？网站已固化的最终结果会保留。')) return;
    resetAllImageAdjustments();
    setAdjustment(getImageAdjustment(work.id, imageIndex, context));
    setSavedCount(Object.keys(readImageAdjustments()).length);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(readImageAdjustments(), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'yang-yang-image-positions.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="position-editor-page">
      <header className="position-editor-nav">
        <Link to="/" className="position-editor-brand">
          <b>YANG / ARCHIVE</b>
          <small>IMAGE POSITION LAB</small>
        </Link>
        <span>剧照位置调整工具</span>
        <Link to={`/works/${work.id}`}>查看正式页面 ↗</Link>
      </header>

      <main className="position-editor-main">
        <aside className="position-editor-controls">
          <div className="position-editor-heading">
            <span>FOCAL POINT EDITOR</span>
            <h1>调整画面焦点</h1>
            <p>拖动画面，或使用下方滑块。每次调整都会自动保存在当前浏览器。</p>
          </div>

          <label className="position-editor-field">
            <span>选择作品</span>
            <select
              value={work.id}
              onChange={(event) => {
                setWorkId(event.target.value);
                setImageIndex(0);
              }}
            >
              {timelineWorks.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.id} · {item.title}
                </option>
              ))}
            </select>
          </label>

          <div className="position-editor-context" aria-label="调整页面类型">
            <button
              className={context === 'timeline' ? 'is-active' : ''}
              type="button"
              onClick={() => selectContext('timeline')}
            >
              时间轴封面
            </button>
            <button
              className={context === 'detail' ? 'is-active' : ''}
              type="button"
              onClick={() => selectContext('detail')}
            >
              详情页背景
            </button>
          </div>

          <div className="position-editor-sliders">
            <label>
              <span>横向位移 <b>{adjustment.offsetX > 0 ? '+' : ''}{adjustment.offsetX.toFixed(1)}%</b></span>
              <input
                type="range"
                min={-IMAGE_OFFSET_LIMIT}
                max={IMAGE_OFFSET_LIMIT}
                step="0.1"
                value={adjustment.offsetX}
                onChange={(event) =>
                  updateAdjustment({ ...adjustment, offsetX: Number(event.target.value) })
                }
              />
            </label>
            <label>
              <span>纵向位移 <b>{adjustment.offsetY > 0 ? '+' : ''}{adjustment.offsetY.toFixed(1)}%</b></span>
              <input
                type="range"
                min={-IMAGE_OFFSET_LIMIT}
                max={IMAGE_OFFSET_LIMIT}
                step="0.1"
                value={adjustment.offsetY}
                onChange={(event) =>
                  updateAdjustment({ ...adjustment, offsetY: Number(event.target.value) })
                }
              />
            </label>
            <label>
              <span>画面缩放 <b>{adjustment.scale.toFixed(2)}×</b></span>
              <input
                type="range"
                min="1"
                max="1.5"
                step="0.01"
                value={adjustment.scale}
                onChange={(event) => updateScale(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="position-editor-actions">
            <button type="button" onClick={handleResetCurrent}>恢复当前默认</button>
            <button type="button" onClick={handleExport}>导出调整结果</button>
            <button className="is-danger" type="button" onClick={handleResetAll}>清除全部调整</button>
          </div>

          <p className="position-editor-saved">已记录 {savedCount} 张图片 · 自动保存已开启</p>
        </aside>

        <section className="position-editor-workspace">
          <div className="position-editor-preview-label">
            <div>
              <span>{context === 'timeline' ? 'TIMELINE PREVIEW' : 'DETAIL BACKGROUND PREVIEW'}</span>
              <strong>{work.title} · 剧照 {imageIndex + 1}</strong>
            </div>
            <small>按住图片拖动</small>
          </div>

          <div
            className={`position-editor-preview is-${context}`}
            ref={previewRef}
            style={context === 'detail' ? { aspectRatio: `${viewportRatio}` } : undefined}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {images[imageIndex] ? (
              <img
                src={images[imageIndex]}
                alt={`${work.title}剧照 ${imageIndex + 1}`}
                draggable="false"
                style={context === 'detail'
                  ? {
                      position: 'absolute',
                      width: detailFitByWidth ? '100%' : 'auto',
                      height: detailFitByWidth ? 'auto' : '100%',
                      maxWidth: 'none',
                      maxHeight: 'none',
                      left: `calc(${detailBaseLeft}% + ${adjustment.offsetX}%)`,
                      top: `calc(50% + ${adjustment.offsetY}%)`,
                      transform: `translate(-50%, -50%) scale(${adjustment.scale})`,
                    }
                  : {
                      position: 'absolute',
                      width: timelineFitByWidth ? '100%' : 'auto',
                      height: timelineFitByWidth ? 'auto' : '100%',
                      maxWidth: 'none',
                      maxHeight: 'none',
                      left: `calc(${timelineBaseLeft}% + ${adjustment.offsetX}%)`,
                      top: `calc(${timelineBaseTop}% + ${adjustment.offsetY}%)`,
                      transform: `translate(-50%, -50%) scale(${adjustment.scale})`,
                    }}
                onLoad={(event) => {
                  setImageRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight);
                }}
              />
            ) : (
              <p>该作品暂无剧照</p>
            )}
            <i className="position-editor-crosshair" aria-hidden="true" />
          </div>

          {context === 'detail' && images.length > 1 ? (
            <div className="position-editor-thumbnails" aria-label="选择剧照">
              {images.map((image, index) => (
                <button
                  className={imageIndex === index ? 'is-active' : ''}
                  type="button"
                  aria-label={`选择剧照 ${index + 1}`}
                  onClick={() => setImageIndex(index)}
                  key={image}
                >
                  <img src={image} alt="" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
