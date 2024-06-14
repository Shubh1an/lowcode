import {
  entities,
  getFilledData,
  getModules,
  getPagebyid,
} from '../../Graphql/modelQuery';
import {
  setEntity,
  setFilledData,
  setModule,
  setNewform,
  setPages,
} from '../../redux/userslice';

export const moduleselected = async (dispatch, permissionapp) => {
  const res = await getModules();

  let modulename = res?.modules?.find((em) => em.name === permissionapp);
  Entity(dispatch, modulename?.id);
  return dispatch(setModule(res?.modules));
};
export const Entity = async (dispatch, moduleId) => {
  const res = await entities(moduleId);
  return dispatch(setEntity(res?.entities));
};
export const Pages = async (dispatch, entityId) => {
  const res = await getPagebyid(entityId);
  dispatch(setPages(res.getPagebyid));
  return res.pages;
};
export const PagesFilleddata = async (dispatch, pageId) => {
  const res = await getFilledData(pageId);
  dispatch(setFilledData(res.getFilledData));
  return res.getFilledData;
};
