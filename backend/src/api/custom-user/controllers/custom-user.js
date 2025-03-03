'use strict';

module.exports = {
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized();
    }
    try {
      const data = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
        populate: ['responsible', 'role_in_web']
      });
      
      if (!data) {
        return ctx.notFound('User not found');
      }

      return ctx.send(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return ctx.badRequest('Error fetching user data');
    }
  },

  async changeRole(ctx) {
    const { id } = ctx.params;
    const { roleId } = ctx.request.body;
  
    if (!id || !roleId) {
      return ctx.badRequest('User ID and Role ID are required');
    }
  
    try {
      const updatedUser = await strapi.entityService.update('plugin::users-permissions.user', id, {
        data: {
          role_in_web: roleId
        },
        populate: ['role_in_web']
      });
  
      return ctx.send(updatedUser);
    } catch (error) {
      console.error('Error changing user role:', error);
      return ctx.badRequest('Error changing user role');
    }
  },
  async createUserWithResponsible(ctx) {
    const { username, email, responsibleName, responsiblePhone, responsibleEmail } = ctx.request.body;
  
    if (!username || !email || !responsibleName || !responsiblePhone || !responsibleEmail) {
      return ctx.badRequest('All fields are required');
    }
  
    let responsible = null; // ประกาศตัวแปรนอก try block
  
    try {
      // สร้าง Responsible ก่อน
      responsible = await strapi.entityService.create('api::responsible.responsible', {
        data: {
          responsibleName,
          responsiblePhone,
          responsibleEmail
        }
      });
  
      // สร้าง User โดยเชื่อมกับ Responsible ที่สร้างไว้
      const user = await strapi.entityService.create('plugin::users-permissions.user', {
        data: {
          username,
          email,
          responsible: responsible.id,
          role_in_web: 2, // ใช้ role ID ที่ต้องการสำหรับผู้ใช้ใหม่
          provider: 'local',
          confirmed: true
        }
      });
  
      return ctx.send({ user, responsible });
    } catch (error) {
      console.error('Error creating user with responsible:', error);
      // ถ้าเกิดข้อผิดพลาดในการสร้าง User ให้ลบ Responsible ที่สร้างไว้
      // ถ้าเกิดข้อผิดพลาดในการสร้าง User ให้ลบ Responsible ที่สร้างไว้
  if (responsible) {
    try {
      await strapi.entityService.delete('api::responsible.responsible', responsible.id);
    } catch (deleteError) {
      console.error('Error deleting responsible after user creation failed:', deleteError);
    }
  }
    return ctx.badRequest(`Error creating user with responsible: ${error.message}`);
    }
  },
};