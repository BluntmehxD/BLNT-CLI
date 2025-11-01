import { AgentController } from '../../core/agent-controller';

describe('AgentController', () => {
  let controller: AgentController;

  beforeEach(() => {
    controller = new AgentController();
  });

  describe('listAgents', () => {
    it('should return list of available agents', async () => {
      const agents = await controller.listAgents();
      
      expect(agents).toBeDefined();
      expect(Array.isArray(agents)).toBe(true);
      expect(agents.length).toBeGreaterThan(0);
    });

    it('should return agents with required properties', async () => {
      const agents = await controller.listAgents();
      
      agents.forEach(agent => {
        expect(agent).toHaveProperty('name');
        expect(agent).toHaveProperty('description');
        expect(agent).toHaveProperty('status');
      });
    });
  });

  describe('startAgent', () => {
    it('should successfully start an agent', async () => {
      const result = await controller.startAgent('Test Agent');
      expect(result).toBe(true);
    });
  });

  describe('stopAgent', () => {
    it('should successfully stop an agent', async () => {
      const result = await controller.stopAgent('Test Agent');
      expect(result).toBe(true);
    });
  });
});
